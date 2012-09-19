/*
Petripy wrote this code, not humans
it is not advisable to change it.
*/

// Generated at: Tue Nov 22 20:22:20 2011 //

//One variable per place
//
boolean pl1;
boolean pl2;
unsigned long timetr2=-1;
unsigned long timetr3=-1;


//You can add globally available code and declarations in the Description of the pnml document.

boolean stateChanged = false;
char ppl[2]={65,0};

void outputStatusLine(){
	//binary dump format
	ppl[1] = 128 | pl1;
	ppl[1] |= (pl2<<1);
Serial.print(ppl);
}





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
        {

    if (timetr2== -1)
        {timetr2=millis();}
        {if         (millis()-timetr2 > 200)
        {
stateChanged=true;
        pl1=false;
        pl2=true;
        digitalWrite(7,HIGH);
timetr2=-1;
            }

        }
    }
}
//
// tr3 ""
//
boolean tr3() {
    if (pl2 && !pl1)
        {

    if (timetr3== -1)
        {timetr3=millis();}
        {if         (millis()-timetr3 > 200)
        {
stateChanged=true;
        pl2=false;
        pl1=true;
        digitalWrite(7,HIGH);
timetr3=-1;
            }

        }
    }
}

//--------------------------------------------------------------------------------
void setup() {
pinMode(13,OUTPUT);
pinMode(7,OUTPUT);
Serial.begin(57600);
reset();
}

void loop() {	stateChanged=false;
int pn1=random(0,2);
switch (pn1) {
	case 0:
		//None
		tr2();
		break;
	case 1:
		//None
		tr3();
		break;
	}
if (stateChanged){
	outputStatusLine();}
}


