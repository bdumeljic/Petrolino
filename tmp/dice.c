/*
Petripy wrote this code, not humans
it is not advisable to change it.
*/

// Generated at: Wed Sep 19 22:05:36 2012 //

//One variable per place
//
boolean pl1;
boolean pl2;
boolean pl3;
boolean pl4;
boolean pl5;
boolean pl6;
boolean pl7;
boolean pl8;
boolean pl10;
boolean pl11;
unsigned long timetr2=-1;
unsigned long timetr3=-1;
unsigned long timetr4=-1;
unsigned long timetr5=-1;
unsigned long timetr8=-1;
unsigned long timetr6=-1;
unsigned long timetr12=-1;


int face1 = 7;
int face2 = 6;
int face3 = 5;
int face4 = 4;
int statusLED =3;
int button = 10;
int faceDelay = 200;
int n=0;


boolean stateChanged = false;
char ppl[3]={65,0,0};

void outputStatusLine(){
	//binary dump format
	ppl[1] = 128 | pl1;
	ppl[1] |= (pl2<<1);
	ppl[1] |= (pl3<<2);
	ppl[1] |= (pl4<<3);
	ppl[1] |= (pl5<<4);
	ppl[1] |= (pl6<<5);
	ppl[1] |= (pl7<<6);
	ppl[2] = 128 | pl8;
	ppl[2] |= (pl10<<1);
	ppl[2] |= (pl11<<2);
Serial.print(ppl);
}





//--------------------------------------------------------------------------------
void reset(){
	pl2=true; //initial marking
	pl3=false;
	pl4=false;
	pl5=false;
	pl1=true; //initial marking
	pl6=false;
	pl8=false;
	pl7=false;
	pl10=true; //initial marking
	pl11=false;
	}

//--------------------------------------------------------------------------------
//One function per transition
//

//Emitter omitted//
// tr2 ""
//
boolean tr2() {
    if ((pl2 && pl8) && !pl3)
        {

    if (timetr2== -1)
        {timetr2=millis();}
        {if         (millis()-timetr2 > faceDelay)
        {
stateChanged=true;
        pl2=false;
        pl3=true;
          digitalWrite(face1,HIGH);
  digitalWrite(face4,LOW);
timetr2=-1;
            }

        }
    }
}
//
// tr3 ""
//
boolean tr3() {
    if ((pl3 && pl8) && !pl4)
        {

    if (timetr3== -1)
        {timetr3=millis();}
        {if         (millis()-timetr3 > faceDelay)
        {
stateChanged=true;
        pl3=false;
        pl4=true;
          digitalWrite(face2,HIGH);
  digitalWrite(face1,LOW);
timetr3=-1;
            }

        }
    }
}
//
// tr4 ""
//
boolean tr4() {
    if ((pl4 && pl8) && !pl5)
        {

    if (timetr4== -1)
        {timetr4=millis();}
        {if         (millis()-timetr4 > faceDelay)
        {
stateChanged=true;
        pl4=false;
        pl5=true;
          digitalWrite(face3,HIGH);
  digitalWrite(face2,LOW);
timetr4=-1;
            }

        }
    }
}
//
// tr5 ""
//
boolean tr5() {
    if ((pl5 && pl8) && !pl2)
        {

    if (timetr5== -1)
        {timetr5=millis();}
        {if         (millis()-timetr5 > faceDelay)
        {
stateChanged=true;
        pl5=false;
        pl2=true;
         digitalWrite(face4,HIGH);
 digitalWrite(face3,LOW);
timetr5=-1;
            }

        }
    }
}
//
// tr7 ""
//
boolean tr7() {
    if (pl1 && !pl6)
        {        {if         (digitalRead(button)==LOW)
        {
stateChanged=true;
        pl1=false;
        pl6=true;
        n--;

            }

        }
    }
}
//
// tr8 wait 1 milli
//
boolean tr8() {
    if (pl6 && !pl1)
        {

    if (timetr8== -1)
        {timetr8=millis();}
        {if         (millis()-timetr8 > 1)
        {
stateChanged=true;
        pl6=false;
        pl1=true;
        n=constrain(n,-10,10);
timetr8=-1;
            }

        }
    }
}
//
// tr9 ""
//
boolean tr9() {
    if (pl6 && (!pl1 && !pl8))
        {        {if         (n>10)
        {
stateChanged=true;
        pl6=false;
        pl1=true;
        pl8=true;
        digitalWrite(statusLED,HIGH);


            }

        }
    }
}
//
// tr10 ""
//
boolean tr10() {
    if (pl1 && !pl6)
        {        {if         (digitalRead(button)==HIGH)
        {
stateChanged=true;
        pl1=false;
        pl6=true;
        n++;

            }

        }
    }
}
//
// tr11 ""
//
boolean tr11() {
    if ((pl6 && pl8) && !pl1)
        {        {if         (n<-10)
        {
stateChanged=true;
        pl6=false;
        pl8=false;
        pl1=true;
        digitalWrite(statusLED,LOW);

            }

        }
    }
}
//
// tr6 ""
//
boolean tr6() {
    if (pl10 && !pl11)
        {

    if (timetr6== -1)
        {timetr6=millis();}
        {if         (millis()-timetr6 > 50)
        {
stateChanged=true;
        pl10=false;
        pl11=true;
        digitalWrite(StatusLED,HIGH);
timetr6=-1;
            }

        }
    }
}
//
// tr12 ""
//
boolean tr12() {
    if ((pl11 && pl8) && !pl10)
        {

    if (timetr12== -1)
        {timetr12=millis();}
        {if         (millis()-timetr12 > 50)
        {
stateChanged=true;
        pl11=false;
        pl10=true;
        digitalWrite(StatusLED,LOW);
timetr12=-1;
            }

        }
    }
}

//--------------------------------------------------------------------------------
void setup() {
pinMode(face1,OUTPUT);
pinMode(face2,OUTPUT);
pinMode(face3,OUTPUT);
pinMode(face4,OUTPUT);
pinMode(statusLED,OUTPUT);
pinMode(button,INPUT);
Serial.begin(115200);
reset();
}

void loop() {	stateChanged=false;
int pn1=random(0,11);
switch (pn1) {
	case 0:
		//None
		tr2();
		break;
	case 1:
		//None
		tr3();
		break;
	case 2:
		//None
		tr4();
		break;
	case 3:
		//None
		tr5();
		break;
	case 4:
		//None
		tr7();
		break;
	case 5:
		//wait 1 milli
		tr8();
		break;
	case 6:
		//None
		tr9();
		break;
	case 7:
		//None
		tr10();
		break;
	case 8:
		//None
		tr11();
		break;
	case 9:
		//None
		tr6();
		break;
	case 10:
		//None
		tr12();
		break;
	}
if (stateChanged){
	outputStatusLine();}
}


