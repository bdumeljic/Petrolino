
import os, sys
import unittest
import exceptions
import pygame
import serial
import math
import albow

from pygame.locals import *
from petripy import SimplePetriNet
from petripy import PetriProg
from petripy import NetElement
from petripy import Arc

#*********************************
import cProfile
#*********************************



if not pygame.font: print 'Warning, fonts disabled'
if not pygame.mixer: print 'Warning, sound disabled'

class Transition(NetElement):
    def draw(self,screen,pane,color=(180,0,0)):
        r=Rect(0,0,self.size[0],self.size[1])
        r.move_ip(pane.left+self.origin[0],pane.top+self.origin[1])
        pygame.draw.rect(screen,color,r)
        

class Place(NetElement):
    marked=False
    needRedraw=True
    def mark(self,newMarked):
        if newMarked!=self.marked:
            self.marked=newMarked
            self.needRedraw
        
    def draw(self,screen,pane,color=(255,255,0),tokenColor=(30,30,30),marked=False):
        if self.needRedraw:
            r=Rect(0,0,self.size[0],self.size[1])
            r.move_ip(pane.left+self.origin[0],pane.top+self.origin[1])
            pygame.draw.ellipse(screen,color,r)
            if self.marked or marked:
                r.inflate_ip(-6,-6)
                pygame.draw.ellipse(screen,tokenColor,r)
            return True
        else:
            return False
                
class VisualArc(Arc):
    def __init__(self,element,net):
        Arc.__init__(self,element) #call superclass constructor
        sourceElement = NetElement(net.transition_or_place(self.source))
        targetElement = NetElement(net.transition_or_place(self.target))
        self.sourcePoint = sourceElement.center
        self.targetPoint = targetElement.center
        
    def draw(self,screen,pane,color=(0,0,0),offset=10):
        origX=pane.left
        origY=pane.top
        pointlist = [self.sourcePoint]
        pointlist.extend(self.bendPoints)
        pointlist.append(self.targetPoint)
        pointlist = map(lambda (x,y):(x+origX,y+origY), pointlist)
        pygame.draw.lines(screen, color, False, pointlist,1)
        


class Preferences:
    background = pygame.Color(192,255,192)

class Application():
    #there can be only one
    displayItems=[]
    quitNow=False
    def __init__(self,width=1200,height=800,autoShutdown=-1):
        pygame.init()
        self.autoShutdown=autoShutdown
        self.width = width
        self.height = height
        self.screen = pygame.display.set_mode((self.width, self.height))
        background = pygame.Surface((self.width, self.height))
        background = background.convert()
        background.fill((250, 224, 224))
        self.background = background
        self.clock= pygame.time.Clock()


    def attach(self,anything):
        self.displayItems.append(anything)

    def detach(self,anything):
        self.displayItems.remove(anything)

    def terminate(self):
        for i in self.displayItems:
            i.shutdown()
            print "blah"
            #pygame.quit()
            #os.quit()
                    

    def MainLoop(self):
        #limit framerate
        quitNow=False
        untouched=False
        self.screen.blit(self.background,(0,0))
        while True:
            #self.clock.tick(10)
            if self.autoShutdown>0:
                self.autoShutdown-=1
                
            if self.autoShutdown==0:
                quitNow=True

            #print "**", self.autoShutdown, quitNow
            if quitNow:
                self.terminate()
                sys.exit()
            #get events
            for event in pygame.event.get():
                print "ip"
                if event.type == pygame.QUIT:
                    quitNow = True                   
            #print "REDRAW"
            for i in self.displayItems:
                untouched=i.redraw(self.screen)
            #update display
            pygame.display.flip()


class Dashboard():
    #A dashboard knows how to draw itself and how to access a data source
    def __init__(self,preferences,network=None,origin=(0,0),width=640,height=480,portSource=None,fileSource=None,fileDump=False):
        self.preferences=preferences
        self.width = width
        self.height = height
        if network==None:
            raise(RuntimeError,"a Dashboard needs a port source of a file source.")
        else:
            self.network = network
        self.rect = pygame.Rect(origin[0],origin[1],self.width,self.height)
        #self.surface= pygame.Surface((self.width, self.height))
        self.places={}
        self.transitions={}
        self.arcs={}
        self.placesID=network.sortedPlacesID() #useful for parsing data input
        self.packetLength=1+int(math.ceil(len(self.placesID)/7.0))
        self.buffer=bytearray(self.packetLength) #right size?
        for p in network.place():
            place = Place(p)
            self.places[place.id]=place;
        for t in network.transition():
            transition = Transition(t)
            self.transitions[transition.id]=transition
        for a in network.arc():
            varc = VisualArc(a,network)
            self.arcs[varc.id]=varc
        if portSource:
            self.portSource=serial.Serial(portSource,baudrate=115200,timeout=1)
        elif fileSource:
            self.portSource=None
            self.fileSource=open(fileSource,"r")
        else:
            self.portSource=None
            self.fileSource=None
            #raise(RuntimeError,"a Dashboard needs a port source of a file source.")
    
    def processBuffer(self):
        #binary dump protocol version zero
        i=0          #where are we in the buffer
        placeBytes=0 #where are we in the list of places
        print ">>"+self.buffer+"<<"
        while i<len(self.buffer):
            print "i",i
            if self.buffer[i] == 0:
                break #end of buffer reached
            if self.buffer[i] < 128:            #beginning of a packet
                placeBytes=0
                protocol=self.buffer[i]-65      #protocol version+'A'
                print "protocol = ",protocol,"  packet length = ", self.packetLength
                if protocol==0:
                    for j in range(0,self.packetLength-1):
                        i+=1
                        print i,j,self.buffer[i]
                        data=bin(self.buffer[i])[2:]    #MSB is always on, data in the other 7 bits
                                                        #in decreasing order of significance
                        print data
                        for k in range(0,8):
                            idx=placeBytes*7+k
                            if idx == len(self.placesID): #we have read all the places
                                print "break"
                                break
                            print "",k,idx,data[7-k],
                            if data[7-k]=="1":
                                print "["+self.placesID[placeBytes*7+k]+"]",
                                self.places[self.placesID[idx]].mark(True)
                            else:
                                print self.placesID[placeBytes*7+k],
                                self.places[self.placesID[idx]].mark(False)
                            print
                        placeBytes+=1
                #i+=self.packetLength #skip over the packet we have just read

            else:
                i+=1 #must have read garbage: read on
                        
                    
                    
                
                

    def redraw(self,screen):
        if self.portSource:
            if self.portSource.inWaiting() !=0:
                bytesRead=self.portSource.readinto(self.buffer)
                if bytesRead != 0:
                    self.processBuffer()
            else:
                return True
        screen.fill(self.preferences.background,self.rect)
        for k,p in self.places.iteritems():
            p.draw(screen,self.rect)
        for k,t in self.transitions.iteritems():
            t.draw(screen,self.rect)
        for k,a in self.arcs.iteritems():
            a.draw(screen,self.rect)
        return False
        

    def shutdown(self):
        if self.portSource:
            self.portSource.close()

class TestNonVisual(unittest.TestCase):
    def setUp(self):
        self.prog1 = PetriProg("blink.pnml")
        self.prog2 = PetriProg("3blink.pnml")
        self.pref1 = Preferences()
        self.pref2 = Preferences()
        self.pref2.background=pygame.Color(192,192,255)
        self.dash1 = Dashboard(self.pref1,network=self.prog1,origin=(10,50),width=600,height=600)
        self.dash2 = Dashboard(self.pref2,network=self.prog2,origin=(620,50),width=570,height=600)
        #print self.prog1.arc(id="a6")[0][0]
        self.va1 = VisualArc(self.prog1.arc(id="a6"),self.prog1)
        self.va2 = VisualArc(self.prog1.arc(id="a7"),self.prog1)
        self.va3 = VisualArc(self.prog1.arc(id="a8"),self.prog1)

    def test_va1_build(self):
        self.assertEqual(self.va1.sourcePoint,(208,175))
        self.assertEqual(self.va1.targetPoint,(313,115))

    def test_va3_build(self):
        self.assertEqual(self.va2.bendPoints,[(373,115),(439,148)])


class TestVisual(unittest.TestCase):
    #@unittest.skip("demonstrating skipping")

    def setUp(self):
        self.app1 = Application()
        self.prog1 = PetriProg("blink.pnml")
        self.prog2 = PetriProg("3blink.pnml")
        self.pref1 = Preferences()
        self.pref2 = Preferences()
        self.pref2.background=pygame.Color(192,192,255)
        self.dash1 = Dashboard(self.pref1,network=self.prog1,origin=(10,50),width=600,height=600)
        self.dash2 = Dashboard(self.pref2,network=self.prog2,origin=(620,50),width=570,height=600)
        self.app1.attach(self.dash1)        

    def test_application_start_stop(self):
        self.app1.quitNow=True
        with self.assertRaises(SystemExit) as cm:
            self.app1.MainLoop()
        #self.assertEqual(cm.exception, SystemExit)
        self.assertTrue(True)

    
    def test_application_start(self):
        self.app1.autoShutdown=200
        with self.assertRaises(SystemExit) as cm:
            self.app1.MainLoop()
        #self.assertEqual(cm.exception, SystemExit)
        self.assertTrue(True)

    def test_application_start_2dashboards(self):
        self.app1.autoShutdown=200
        self.app1.attach(self.dash2)
        with self.assertRaises(SystemExit) as cm:
            self.app1.MainLoop()
        print type(cm.exception)
        #self.assertEqual(cm.exception, SystemExit)
        self.assertTrue(True)

    def test_application_start(self):
        self.app1.autoShutdown=200
        with self.assertRaises(SystemExit) as cm:
            self.app1.MainLoop()
        #self.assertEqual(cm.exception, SystemExit)
        self.assertTrue(True)

  
if __name__ == "__main__":
    unittest.main()
    net = SimplePetriNet(path="testcase1.pnml")
    Dash1= Dashboard(preferences=Preferences(),network=net,portSource="com19")
    App = Application()
    App.attach(Dash1)
    App.MainLoop()
    #cProfile.run("App.MainLoop()")
