########
# Petripy
# v 0.3.0 added biflow arcs
#   added binary dump format 1
# v 0.2.0 refactored PetriProg into PetriNet and PetriProg
#   added stochastic scheduler and tests
#   added comments in both schedulers
# v 0.0.1 initial version
#
# turn a Petri net into Arduino code
# designer friendly C programming
#
# Walter Aprile @ studiolab in Delft University of Technology (aka TUDelft, DUT)
# July 2011
#
#import snakes.pnml #I can live without snakes
#import snakes      #more trouble than what it is worth

#used only in testing
import unittest
import hashlib #perhaps get rid of this
#

import xml.etree.ElementTree #can't live without you!
import string
import types #could probably do without
import math
import re
import time

class NetElement():
    #abstract class
    def __init__(self,element):
        self.id = element.get("id")
        self.name = element.findtext("name/text")
        self.description = element.findtext("description/text")
        graphicsPos = element.find("graphics/position")
        ox,oy=int(graphicsPos.get("x")),int(graphicsPos.get("y"))
        self.origin = (ox,oy)
        graphicsSize = element.find("graphics/dimension")
        sx,sy=int(graphicsSize.get("x")),int(graphicsSize.get("y"))
        self.size = (sx,sy)
        self.center = (int(ox+sx/2),int(oy+sy/2))

class Arc():
    def __init__(self,element,xoffset=10,yoffset=16):
        self.id = element.get("id")
        self.source = element.get("source")
        self.target = element.get("target")
        self.name = element.findtext("name/text")
        self.description = element.findtext("description/text")
        bendPoints = element.findall("graphics/position")
        if bendPoints:
            self.bendPoints=map(lambda e:(int(e.get("x"))+xoffset,int(e.get("y"))+yoffset),bendPoints)
        else:
            self.bendPoints = []
                        


class SimplePetriNet(object):
    
    emitter = None
    net = None
    
    def __init__(self,path=None):
        """Make a new net. If a path is supplied, read in a PNML file"""
        if path:
            tree= xml.etree.ElementTree.ElementTree()
            tree.parse(path)
            
##          //rewritten for clarity
##            for element in tree.iter("transition"):
##                name = element.findtext("name/text")
##                if name=="Bootstrap":
##                    self.emitterID = self.getid(element)
            
            self.net = tree
            emitter = self.transition(name="Bootstrap")
            if emitter == None:
                self.emitterID = None
            else:
                self.emitterID = self.getid(emitter)
        else:
            self.net = None

    def stripToID(self,elementIterator):
        res=[]
        for e in elementIterator:
            res.append(self.getid(e))
        return res

    def getid(self,element):
        return element.get("id")
        
    def documentRemarks(self):
        return self.net.findtext("net/description/text")

    def transition_or_place(self,id):
        #not so nice - return a transition OR a place that matches the id
        t=self.transition(id=id)
        if t==None:
            return self.place(id=id)
        else:
            return t

    def transition(self,id=None,name=None):
        #when called with no arguments return an iterator with all the transitions
        #when called with arguments returns a single transition
        #
        #this looks like it makes sense but is probably a very bad idea
        i=self.net.iter("transition")
        if id==None and name==None:
            return i
        else:
            for e in i:
                if ((id and self.getid(e)==id) or (name and e.findtext("name/text")==name)):
                    return e
            return None

    def place(self,id=None,name=None):
        #when called with no arguments return an iterator with all the places
        #when called with arguments returns a single place
        #
        #this looks like it makes sense but is probably a very bad idea
        i=self.net.iter("place")
        if id==None and name==None:
            return i
        else:
            for e in i:
                if ((id and self.getid(e)==id) or (name and e.findtext("name/text")==name)):
                    return e
            return None
        
    def sortedPlacesID(self,places=None):
        #important to keep it consistent between code uploaded to the Arduino and code that display the places
        if not places:
                places = self.place()
        res = self.stripToID(places)
        convert = lambda text: int(text) if text.isdigit() else text
        alphanum_key = lambda key: [ convert(c) for c in re.split('([0-9]+)', key)]
        res.sort(key=alphanum_key) #strip the pl part
        return res

    def arc(self,id=None,sourceID=None,targetID=None,name=None):
        #when called with no arguments return an iterator with all the arcs
        #otherwise returns a list containing
        # either the first arc with a given name or id
        # or all the arcs with a given source or target
        r=[]
        i=self.net.iter("arc")
        if (id==None and sourceID==None and targetID==None and name==None):
            return i
        else:
            for e in i:
                if ((id and self.getid(e)==id) or (name and e.findtext("name")==name)):
                    return e
                    break  # the first one will do
                    # why should you have multiple arcs with the same ID or name?
                if ((sourceID and e.get("source")==sourceID) or (targetID and e.get("target")==targetID)):
                    r.append(e)
                    #break # I want all of them
        return r
                
    def initialMarking(self):
        arcs=self.arc(sourceID=self.emitterID)
        initial = map(lambda x: x.get("target"), arcs)
        return initial

class PetriProg(SimplePetriNet):

    def __init__(self,path):
        super(PetriProg, self).__init__(path)
        #maybe do other stuff here
        
    def makePlacesDeclarations(self,places):
        out="//One variable per place\n//\n"
        for p in self.sortedPlacesID():
            out += "boolean %s;\n" %p
        return out

    def makeStatusDeclarationAndLine(self,places=None,version=0):
        out="\nvoid outputStatusLine(){\n"
        globalDeclaration=""
        protocolID = 65+version
        if version==0:
            out+="\t//binary dump format\n"
            places = self.sortedPlacesID()
            lp = len(places)
            payloadLength=int(math.ceil(lp/7.0)) #7 bit packages
            globalDeclaration="char ppl[%d]={%d%s};"%(payloadLength+1,protocolID,",0"*payloadLength)
            
            for i in range(0,lp):
                word=int(i/7)+1
                bit=i%7
                place=places[i]
                if bit==0:
                    out+="\tppl[%d] = 128 | %s;\n" % (word,place)
                else:
                    out+="\tppl[%d] |= (%s<<%d);\n" % (word,place,bit)
        out+="Serial.print(ppl);\n}\n\n"
        return globalDeclaration,out    
            
    def makeReset(self,places,initial):
        #initial marking is a list of IDs of places that should be marked at net start
        out="void reset(){\n"
        for p in self.stripToID(places):
            if p in initial:
                out += "\t%s=true; //initial marking\n" %p
            else:
                out += "\t%s=false;\n" %p
        out+="\t}\n"
        return out
    

    def getTimeout(self,e):
        desc=e.findtext("description/text")
        if desc:
            n = re.findall(r"\d+",desc)
            if n!=[]:
                return n[0]
            else:
                return desc
        else:
            return None

    def makeTimeoutDeclarations(self,transitions,emitterIncluded=False,vartype="unsigned long"):
        out=""
        for t in transitions:
            tID=self.getid(t)
            if self.getTimeout(t) and (tID != self.emitterID) or emitterIncluded==True:
                out+="%s %s=-1;\n" % (vartype,self.makeTimeoutVar(tID))
        return out

    def makeTimeoutVar(self,tID):
        return "time"+tID

    def makeDebugLine(self,who,what):
        out="""        Serial.print(millis());
        Serial.print(" %s ");
        Serial.println(%s);
""" % (who,what)
        return out

    def conjClause(self,l,negate=False,alwaysPar=True):
        if negate:
            neg="!"
        else:
             neg=""
             
        if len(l)==0:
            res= ""
        elif len(l)==1:
            if negate:
                res="%s%s" %(neg,l[0])
            else:
                res=l[0]
            if alwaysPar:
                res="("+res+")"
        else:
            res="("
            for var in l:
                res+="%s%s && " % (neg,var)
            res=res[:-4]
            res+=")"
        return res

    def disjClause(self,l,negate=False,alwaysPar=True):
        if negate:
            neg="!"
        else:
            neg=""
             
        if len(l)==0:
            res= ""
        elif len(l)==1:
            if negate:
                res="%s%s" %(neg,l[0])
            else:
                res=l[0]
            if alwaysPar:
                res="("+res+")"
        else:
            res="("
            for var in l:
                res+="%s%s || " % (neg,var)
            res=res[:-4]
            res+=")"
        return res

    def negateClause(self,c):
        #negates a clause
        if len(c)==0:
            return ""
        elif len(c)==1:
            return "!"+c
        else:
            return "!("+c+")"
        

    def makeTransitionFunctions(self,transitions,debug=True):
        functionsCode = "//One function per transition\n//\n\n"
        if type(transitions) != types.GeneratorType:
            transitions = [transitions]
        for t in transitions:
            functionsCode+=self.makeTransitionFunction(t,debug=debug)
        return functionsCode

    def makeTransitionFunction(self,t,debug=True):
        out=""
        tName = t.findtext("name/text")
        if tName == None:
            tName = "\"\""
        tID=self.getid(t)
        if tID == self.emitterID:
            #don't generate a transition function for the emitter
            #is this still a good idea?
            return "//Emitter omitted"
        timeout=self.getTimeout(t)
        timeoutVar=self.makeTimeoutVar(tID)
        pre=self.arc(targetID=tID)
        post=self.arc(sourceID=tID)
        #keep the names in, useful for making comments
        actions=map(lambda x:[x.get("target"),x.findtext("description/text"),x.findtext("name/text")],post)
        preconditions=map(lambda x:[x.get("source"),x.findtext("description/text"),x.findtext("name/text")],pre)    
        spaces=8*" "
        out+="//\n"
        out+="// %s %s\n" % (tID,tName)
        out+="//\n"
        out+="boolean %s() {\n" % tID
        out+="    if "
        #are all the tokens there?
        #are output places all empty
        prePlaces = filter(lambda x:x!=None,map(lambda x:x[0], preconditions))
        postPlaces = filter(lambda x:x!=None,map(lambda x:x[0], actions))
        #modification to allow biflow arcs
        postPlacesNotBiflow = filter(lambda x:not(x in prePlaces), postPlaces)
        prePlacesNotBiflow = filter(lambda x:not(x in postPlaces), prePlaces)
        #gather guards and actions
        preGuards = filter(lambda x:x!=None,map(lambda x:x[1], preconditions))
        postActions = filter(lambda x:x!=None,map(lambda x:x[1], actions))
        enablingCondition = self.conjClause([self.conjClause(prePlaces,alwaysPar=False),self.conjClause(postPlacesNotBiflow,negate=True,alwaysPar=False)],alwaysPar=True)
        out+= enablingCondition + "\n        {"
        resetTimestampLine = "%s=millis();" % timeoutVar

        #basic firing rule has been verified. Now updating timeout variable
        if timeout:
            out+="""

    if (%s== -1)
        {%s}
"""%(timeoutVar,resetTimestampLine)

        out+= spaces+"{if "
       
        #rule will fire if it timesout OR if ALL the preconditions are true
        if timeout:
            timeoutCheck = "(millis()-%s > %s)"%(timeoutVar,timeout)
            
        out+=spaces
        if timeout and preGuards:
            out+=self.disjClause([timeoutCheck,self.conjClause(preGuards)],alwaysPar=True)
        elif timeout:
            out+=timeoutCheck
        elif preGuards:
            out+=self.conjClause(preGuards,alwaysPar=True)
        else:
            #rule can always fire (if places are OK)
            out+="(true)"
        out+="\n"

        #now we can fire the rule
        out+=spaces+"{\nstateChanged=true;\n"
        for p in prePlacesNotBiflow:
            out+= spaces+"%s=false;\n" % p
##            if self.binTrace1:
##                out+= spaces+"binTrace1(%s,%s);\n" % s,"false"
        for p in postPlacesNotBiflow:
            out+= spaces+"%s=true;\n" % p
##            if self.binTrace1:
##                out+= spaces+"binTrace1(%s,%s);\n" % s,"true"
        for a in postActions:
            out+=spaces+"%s\n"% a
            #execute actions associated with arc
        if debug:
            out+=self.makeDebugLine(tID,1)
        if timeout:
            out+="%s=-1;" % timeoutVar   
        out+="\n    "+spaces+"}\n"
        out+="\n"+spaces+"}\n"
        out+="    }\n"
        out+="}\n"

        return out
        
    def makeSetup(self):
        #declare appropriate pins as output or inputs, can only be done after code inspection
        #take it all from the Emitter description
        out = "void setup() {\n"
        setupCode = self.transition(id=self.emitterID).findtext("description/text")
        if setupCode != None:
            out+= self.transition(id=self.emitterID).findtext("description/text")
        out+="\nreset();\n"
        out +="}\n\n"
        return out

    def makeGlobal(self,statusReporting=None):
        r=self.documentRemarks()
        if r==None:
            r="//You can add globally available code and declarations in the Description of the pnml document."
        r+="\n\nboolean stateChanged = false;\n"
        if statusReporting!=None:
            decl,outputStatusLine=self.makeStatusDeclarationAndLine(version=statusReporting)
            r=r+decl+"\n"+outputStatusLine+"\n"
        return "\n"+r+"\n\n"

    def makeLoop(self,transitions,policy="RoundRobin",statusReporting=None):
        #appropriate scheduling policy
        out = "void loop() {\tstateChanged=false;\n"
        if policy=="RoundRobin":
            for t in transitions:
                tID=self.getid(t)
                if tID != self.emitterID:
                    out+=" %s(); //%s\n"% (tID,t.findtext("name/text"))
        elif policy=="Stochastic":
            #unroll iterator, this sucks
            transitionsL=[]
            for t in transitions:
                transitionsL.append(t)
            transitionsCount=len(transitionsL)-1 #Emitter will never be called
            out+="int pn1=random(0,%i);\n" % transitionsCount
            #inefficient: creates a random variable at every iteration
            out+="switch (pn1) {\n"
            c=0
            for t in transitionsL:
                tID=self.getid(t)
                if tID != self.emitterID:
                    out+="\tcase %i:\n" %c
                    out+="\t\t//%s\n" % t.findtext("name/text")
                    out+="\t\t%s();\n"%tID
                    out+="\t\tbreak;\n"
                    c+=1
            out+="\t}\n"
        else:
            print 'Policy',policy,'is unknown. Cannot generate code.'
            #crash, generate appropriate exception
        if statusReporting!=None:
            out+="if (stateChanged){\n"
            out+="\toutputStatusLine();"
            out+="}\n"
        out+="}\n\n"
            
        return out
        
    def produceCode(self,fname="petripied.pde",debug=True,vartype="unsigned long",policy="RoundRobin",timestamp=True,statusReporting=None):
        placesDeclarations = self.makePlacesDeclarations(self.place())
        reset=self.makeReset(self.place(),self.initialMarking())
        timeoutDeclarations = self.makeTimeoutDeclarations(self.transition(),vartype=vartype)+"\n"
        transitionFunctions = self.makeTransitionFunctions(self.transition(),debug=debug)
        globalCode=self.makeGlobal(statusReporting=statusReporting)
        boilerPlate="/*\nPetripy wrote this code, not humans\nit is not advisable to change it.\n*/\n"
        if timestamp:
            boilerPlate+="\n// Generated at: " + time.ctime() + " //\n\n"
        setup = self.makeSetup()
        loop = self.makeLoop(self.transition(),policy=policy,statusReporting=statusReporting)
        burst="\n//"+"-"*80+"\n"
        tail = "\n"
        out = boilerPlate+placesDeclarations+timeoutDeclarations+globalCode+burst+reset+burst+transitionFunctions+burst+setup+loop+tail
        rfh=open(fname,"w")
        rfh.write(out)
        rfh.close()
        return out
    
##--------------------------------------------------------------------
##
## Test functions
##
##--------------------------------------------------------------------


class TestPetriElementFunctions(unittest.TestCase):
    def setUp(self):
        self.prog1 = PetriProg("blink.pnml")
        self.prog2 = PetriProg("dit-dot.pnml")
        self.place1 = self.prog1.place(id="pl1")
        self.trans1 = self.prog1.transition(id="tr1")
        self.arc1 = self.prog1.arc(id="a9") #no bend
        self.arc2 = self.prog1.arc(id="a6") #one bend
        self.arc3 = self.prog1.arc(id="a7") #two bends

    def test_transition_or_place(self):
        p=NetElement(self.prog1.transition_or_place(id="pl1"))
        self.assertEqual(p.name,"blinkOff")

    def test_transition_or_place(self):
        t=NetElement(self.prog1.transition_or_place(id="tr2"))
        self.assertEqual(t.description,"timeout(200);")
    
    def test_parse_place(self):
        p = NetElement(self.place1)
        self.assertEqual(p.name,"blink OFF")
        self.assertEqual(p.id,"pl1")
        self.assertEqual(p.description,"a state in which the blink is off")
        self.assertEqual(p.origin,(198,165))
        self.assertEqual(p.size,(20,20))
        self.assertEqual(p.center,(208,175))
        
    def test_parse_transition(self):
        t = NetElement(self.trans1)
        self.assertEqual(t.name,"transition to light on")
        self.assertEqual(t.id,"tr1")
        self.assertEqual(t.description,"timeout(500);")
        self.assertEqual(t.origin,(297,99))
        self.assertEqual(t.size,(32,32))

    def test_parse_arc1(self):
        #a9 - no bends
        a = Arc(self.arc1)
        self.assertEqual(a.name,"action for blinkOFF")
        self.assertEqual(a.source,"tr2")
        self.assertEqual(a.target,"pl1")
        self.assertEqual(a.id,"a9")
        self.assertEqual(a.description,"digitalWrite(13,LOW);")
        self.assertEqual(a.bendPoints,[])

    def test_parse_arc2(self):
        #a6 - one bend
        a = Arc(self.arc2)
        self.assertEqual(a.name,"guard for blinkON: pin 10 low")
        self.assertEqual(a.source,"pl1")
        self.assertEqual(a.target,"tr1")
        self.assertEqual(a.description,"digitalRead(10)==LOW")
        self.assertEqual(a.id,"a6")
        self.assertEqual(a.bendPoints,[(208, 115)])
        
    def test_parse_arc3(self):
        #a7 - two bends
        a = Arc(self.arc3)
        self.assertEqual(a.name,"action to blinkON")
        self.assertEqual(a.source,"tr1")
        self.assertEqual(a.target,"pl2")
        self.assertEqual(a.description,"digitalWrite(13,HIGH);")
        self.assertEqual(a.id,"a7")
        self.assertEqual(a.bendPoints,[(373, 115), (439, 148)])

    def test_places_id_1(self):
        result = self.prog1.sortedPlacesID()
        self.assertEqual(result,["pl1","pl2"])

    def test_places_id_2(self):
        #there are no places 3 and 4
        result = self.prog2.sortedPlacesID()
        self.assertEqual(result,["pl1","pl2","pl5","pl6","pl7","pl8"])

class TestPetriNetFunctions(unittest.TestCase):
    def setUp(self):
        self.prog1 = PetriProg("blink.pnml")
        self.prog2 = PetriProg("dit-dot.pnml")
        self.prog3 = PetriProg("debouncer.pnml")
        self.prog4 = PetriProg("3blink.pnml")
        self.prog5 = PetriProg("biflow.pnml")
        self.prog6 = PetriProg("5blink.pnml") #biggish network
        self.maxDiff = 2048

    def unroll(self,iterateur):
        #Dangerous, but useful for testing
        r=[]
        for i in iterateur:
            r.append(i)
        return r
    
    def mws(self,s):
        """reduce whitespace to single spaces for easy code comparison"""
        return " ".join(s.split())


    def test_load_blink(self):
        self.assertTrue(self.prog1)

    def test_parse1_blink(self):
        net = self.prog1
        places = net.place()
        transitions = net.transition()
        self.assertEqual(len(self.unroll(places)),2)
        self.assertEqual(len(self.unroll(transitions)),3)
        
    def test_emitter_blink(self):
        self.assertEqual(self.prog1.emitterID,"tr4")

    def test_initialMarking_blink(self):
        self.assertEqual(self.prog1.initialMarking(),["pl1"])

    def test_makePlacesDeclarations(self):
        placesCode=self.prog1.makePlacesDeclarations(self.prog1.place())
        self.assertEqual(self.mws(placesCode),self.mws("""//One variable per place
//
boolean pl1;
boolean pl2;
"""))

    def test_makeReset(self):
        placesCode=self.prog1.makeReset(self.prog1.place(),self.prog1.initialMarking())
        res="""void reset(){
    pl1=true; //initial marking
    pl2=false;
    }
"""
        self.assertEqual(self.mws(placesCode),self.mws(res))
        
    def test_makeTimeoutDeclarationsProg1Default(self):
        timeoutDeclarations = self.prog1.makeTimeoutDeclarations(self.prog1.transition())
        expected = """unsigned long timetr1;
unsigned long timetr2;
"""
    def test_makeTimeoutDeclarationsProg1Int(self):
        timeoutDeclarations = self.prog1.makeTimeoutDeclarations(self.prog1.transition(),vartype="int")
        expected = """int timetr1=-1;
int timetr2=-1;
"""
        self.assertEqual(self.mws(expected), self.mws(timeoutDeclarations))

    def test_timeout1(self):
        res=self.prog1.getTimeout(self.prog1.transition(id="tr1"))
        self.assertEqual(res,"500")

    def test_timeout2(self):
        res=self.prog2.getTimeout(self.prog2.transition(id="tr9"))
        self.assertEqual(res,None)

    def test_makeTransitionFunctions1(self):
        function=self.prog1.makeTransitionFunctions(self.prog1.transition())

    def test_produceCode4(self):
        output=self.prog3.produceCode(timestamp=False,debug=True,policy="RoundRobin")
        expected="""/*
Petripy wrote this code, not humans
it is not advisable to change it.
*/
//One variable per place
//
boolean pl1;
boolean pl2;
unsigned long timetr3=-1;


int n=0;

boolean stateChanged = false;


//--------------------------------------------------------------------------------
void reset(){
	pl1=true; //initial marking
	pl2=false;
	}

//--------------------------------------------------------------------------------
//One function per transition
//

//Emitter omitted//
// tr2 ""
//
boolean tr2() {
    if (pl1 && !pl2)
        {        {if         (digitalRead(7)==LOW)
        {
stateChanged=true;
        pl1=false;
        pl2=true;
        n--;
        Serial.print(millis());
        Serial.print(" tr2 ");
        Serial.println(1);

            }

        }
    }
}
//
// tr3 wait 25 millis
//
boolean tr3() {
    if (pl2 && !pl1)
        {

    if (timetr3== -1)
        {timetr3=millis();}
        {if         (millis()-timetr3 > 25)
        {
stateChanged=true;
        pl2=false;
        pl1=true;
        n=constrain(n,-100,100);
        Serial.print(millis());
        Serial.print(" tr3 ");
        Serial.println(1);
timetr3=-1;
            }

        }
    }
}
//
// tr4 ""
//
boolean tr4() {
    if (pl2 && !pl1)
        {        {if         (n>100)
        {
stateChanged=true;
        pl2=false;
        pl1=true;
        digitalWrite(13,HIGH);

        Serial.print(millis());
        Serial.print(" tr4 ");
        Serial.println(1);

            }

        }
    }
}
//
// tr5 ""
//
boolean tr5() {
    if (pl1 && !pl2)
        {        {if         (digitalRead(7)==HIGH)
        {
stateChanged=true;
        pl1=false;
        pl2=true;
        n++;
        Serial.print(millis());
        Serial.print(" tr5 ");
        Serial.println(1);

            }

        }
    }
}
//
// tr6 ""
//
boolean tr6() {
    if (pl2 && !pl1)
        {        {if         (n<-100)
        {
stateChanged=true;
        pl2=false;
        pl1=true;
        digitalWrite(13,LOW);
        Serial.print(millis());
        Serial.print(" tr6 ");
        Serial.println(1);

            }

        }
    }
}

//--------------------------------------------------------------------------------
void setup() {
Serial.begin(57600);
pinMode(13,OUTPUT);
pinMode(7,INPUT);
reset();
}

void loop() {
stateChanged=false;
 tr2(); //None
 tr3(); //wait 25 millis
 tr4(); //None
 tr5(); //None
 tr6(); //None
}"""
        
        self.assertSequenceEqual(self.mws(expected),self.mws(output))

    def test_roundRobinScheduler4(self):
        res=self.prog4.makeLoop(self.prog4.transition(),policy="RoundRobin")
        expected="""void loop() {
 stateChanged=false;
 tr1(); //transition to light on
 tr2(); //transition for light off
 tr3(); //transition to light on
 tr5(); //transition for light off
 tr10(); //transition to light on
 tr11(); //transition for light off
}
""" 
        self.assertSequenceEqual(self.mws(res), self.mws(expected))
        
    def test_stochasticScheduler4(self):
        res=self.prog4.makeLoop(self.prog4.transition(),policy="Stochastic")
        expected="""void loop() {
stateChanged=false;
int pn1=random(0,6);
switch (pn1) {
	case 0:
		//transition to light on
		tr1();
		break;
	case 1:
		//transition for light off
		tr2();
		break;
	case 2:
		//transition to light on
		tr3();
		break;
	case 3:
		//transition for light off
		tr5();
		break;
	case 4:
		//transition to light on
		tr10();
		break;
	case 5:
		//transition for light off
		tr11();
		break;
	}
}
"""
        self.assertEqual(self.mws(res), self.mws(expected))
  
    def test_statusReportingZero(self):
        output=self.prog1.produceCode(timestamp=False,debug=False,policy="RoundRobin",statusReporting=0)
        print output
        

    def test_conjClause(self):
        r=self.prog1.conjClause(["a"],alwaysPar=False)
        self.assertEqual(r,"a")
        r=self.prog1.conjClause(["a"],alwaysPar=True)
        self.assertEqual(r,"(a)")
        r=self.prog1.conjClause(["a"],negate=True)
        self.assertEqual(r,"(!a)")
        r=self.prog1.conjClause(["a"],negate=True,alwaysPar=False)
        self.assertEqual(r,"!a")
        r=self.prog1.conjClause(["a","b"])
        self.assertEqual(r,"(a && b)")
        r=self.prog1.conjClause(["a","b","c"],negate=True)
        self.assertEqual(r,"(!a && !b && !c)")
        r=self.prog1.conjClause([])
        self.assertEqual(r,"")

    def test_disjClause(self):
        r=self.prog1.disjClause(["a"],alwaysPar=False)
        self.assertEqual(r,"a")
        r=self.prog1.disjClause(["a"])
        self.assertEqual(r,"(a)")
        r=self.prog1.disjClause(["a"],negate=True,alwaysPar=False)
        self.assertEqual(r,"!a")
        r=self.prog1.disjClause(["a"],negate=True)
        self.assertEqual(r,"(!a)")
        r=self.prog1.disjClause(["a","b"])
        self.assertEqual(r,"(a || b)")
        r=self.prog1.disjClause(["a","b","c"],negate=True)
        self.assertEqual(r,"(!a || !b || !c)")
        r=self.prog1.disjClause([])
        self.assertEqual(r,"")

    def test_mixClause(self):
        r=self.prog1.disjClause([self.prog1.conjClause(["a","b"]),self.prog1.conjClause(["c","d"],negate=True)])
        self.assertEqual(r,"((a && b) || (!c && !d))")

    
    def test_biflow(self):
        r=self.prog5.makeTransitionFunction(self.prog5.transition("tr2"),debug=False)
        expected="""// // tr2 "" // boolean tr2() {
    if (pl1 && !pl2)
        {        {if         (true)
        {
        stateChanged=true;
        pl2=true;
            } } } }"""
        self.assertSequenceEqual(self.mws(r),self.mws(expected))
        

    def test_makeStatusDeclarationAndLine1(self):
        decl,code=self.prog1.makeStatusDeclarationAndLine()
        targetDecl="char ppl[2]={65,0};"
        targetCode="""void outputStatusLine(){
	//binary dump format
	ppl[1] = 128 | pl1;
	ppl[1] |= (pl2<<1);
	Serial.print(ppl);
}"""
        
        self.assertSequenceEqual(self.mws(decl),self.mws(targetDecl))
        self.assertSequenceEqual(self.mws(code),self.mws(targetCode))

    def test_makeStatusDeclarationAndLine2(self):
        decl,code=self.prog2.makeStatusDeclarationAndLine()
        #
        targetDecl="char ppl[2]={65,0};"
        targetCode="""void outputStatusLine(){
	//binary dump format
	ppl[1] = 128 | pl1;
	ppl[1] |= (pl2<<1);
	ppl[1] |= (pl5<<2);
	ppl[1] |= (pl6<<3);
	ppl[1] |= (pl7<<4);
	ppl[1] |= (pl8<<5);
	Serial.print(ppl);
}
"""

        self.assertSequenceEqual(self.mws(decl),self.mws(targetDecl))
        self.assertSequenceEqual(self.mws(code),self.mws(targetCode))
            
    def test_makeStatusDeclarationAndLine3(self):
        decl,code=self.prog6.makeStatusDeclarationAndLine()
        targetDecl="char ppl[3]={65,0,0};"
        targetCode="""void outputStatusLine(){
	//binary dump format
	ppl[1] = 128 | pl1;
	ppl[1] |= (pl2<<1);
	ppl[1] |= (pl3<<2);
	ppl[1] |= (pl4<<3);
	ppl[1] |= (pl5<<4);
	ppl[1] |= (pl6<<5);
	ppl[1] |= (pl7<<6);
	ppl[2] = 128 | pl8;
	ppl[2] |= (pl9<<1);
	ppl[2] |= (pl10<<2);
	ppl[2] |= (pl11<<3);
	ppl[2] |= (pl12<<4);
	ppl[2] |= (pl13<<5);
	ppl[2] |= (pl14<<6);
        Serial.print(ppl);    
}"""
        self.assertSequenceEqual(self.mws(decl),self.mws(targetDecl))
        self.assertSequenceEqual(self.mws(code),self.mws(targetCode))

    
if __name__ == '__main__':
    #unittest.main()
    projectName="blink-if-change-example"
    prog1 = PetriProg(projectName+".pnml")
    code=prog1.produceCode(fname=projectName+".c", debug=False, policy="Stochastic", statusReporting=0)
    print "Codesize = ",len(code)




