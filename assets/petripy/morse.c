/*
Petripy wrote this code, not humans
it is not advisable to change it.
*/

// Generated at: Wed Oct 12 18:26:37 2011 //

//One variable per place
//
boolean pl5;
boolean pl6;
boolean pl9;
boolean pl10;
boolean pl11;
unsigned long timetr12=-1;
unsigned long timetr13=-1;
unsigned long timetr14=-1;


int red=7;
int green=5;
int blue=6;
int yellow=4;
int white=3;
int key=10;
int dotTime=500;


boolean stateChanged = false;
char ppl[2]={65,0};

void outputStatusLine(){
	//binary dump format
	ppl[1] = 128 | pl5;
	ppl[1] |= (pl6<<1);
	ppl[1] |= (pl9<<2);
	ppl[1] |= (pl10<<3);
	ppl[1] |= (pl11<<4);
Serial.print(ppl);
}





//--------------------------------------------------------------------------------
void reset(){
	pl5=true; //initial marking
	pl6=false;
	pl9=false;
	pl10=false;
	pl11=false;
	}

//--------------------------------------------------------------------------------
//One function per transition
//

//Emitter omitted//
// tr6 ""
//
boolean tr6() {
    if (pl5 && !pl6)
        {        {if         (digitalRead(key)==LOW)
        {
stateChanged=true;
        pl5=false;
        pl6=true;

            }

        }
    }
}
//
// tr8 dash
//
boolean tr8() {
    if (pl11 && !pl10)
        {        {if         (digitalRead(key)==LOW)
        {
stateChanged=true;
        pl11=false;
        pl10=true;
        digitalWrite(red,HIGH);

            }

        }
    }
}
//
// tr9 dot
//
boolean tr9() {
    if (pl11 && !pl9)
        {        {if         (digitalRead(key)==HIGH)
        {
stateChanged=true;
        pl11=false;
        pl9=true;
        digitalWrite(blue,HIGH);

            }

        }
    }
}
//
// tr12 ""
//
boolean tr12() {
    if (pl6 && !pl11)
        {

    if (timetr12== -1)
        {timetr12=millis();}
        {if         (millis()-timetr12 > dotTime)
        {
stateChanged=true;
        pl6=false;
        pl11=true;
timetr12=-1;
            }

        }
    }
}
//
// tr13 ""
//
boolean tr13() {
    if (pl10 && !pl5)
        {

    if (timetr13== -1)
        {timetr13=millis();}
        {if         (millis()-timetr13 > 5000)
        {
stateChanged=true;
        pl10=false;
        pl5=true;
        digitalWrite(red,LOW);
digitalWrite(blue,LOW);
timetr13=-1;
            }

        }
    }
}
//
// tr14 ""
//
boolean tr14() {
    if (pl9 && !pl5)
        {

    if (timetr14== -1)
        {timetr14=millis();}
        {if         (millis()-timetr14 > 5000)
        {
stateChanged=true;
        pl9=false;
        pl5=true;
        digitalWrite(red,LOW);
digitalWrite(blue,LOW);
timetr14=-1;
            }

        }
    }
}

//--------------------------------------------------------------------------------
void setup() {
pinMode(13,OUTPUT);
pinMode(red,OUTPUT);
pinMode(green,OUTPUT);
pinMode(blue,OUTPUT);
pinMode(yellow,OUTPUT);
pinMode(white,OUTPUT);
pinMode(key,INPUT);
Serial.begin(115200);
reset();
}

void loop() {	stateChanged=false;
int pn1=random(0,6);
switch (pn1) {
	case 0:
		//None
		tr6();
		break;
	case 1:
		//dash
		tr8();
		break;
	case 2:
		//dot
		tr9();
		break;
	case 3:
		//None
		tr12();
		break;
	case 4:
		//None
		tr13();
		break;
	case 5:
		//None
		tr14();
		break;
	}
if (stateChanged){
	outputStatusLine();}
}


