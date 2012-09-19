/*
Petripy wrote this code, not humans
it is not advisable to change it.
*/

// Generated at: Wed Sep 19 22:22:06 2012 //

//One variable per place
//
boolean pl0;
boolean pl1;
unsigned long timetr2=-1;


int face1 = 7;
	int face2 = 6;
	int face3 = 5;
	int face4 = 4;
	int statusLED =3;
	int button = 10;
	int faceDelay = 200;
	int n=0;
	

boolean stateChanged = false;
char ppl[2]={65,0};

void outputStatusLine(){
	//binary dump format
	ppl[1] = 128 | pl0;
	ppl[1] |= (pl1<<1);
Serial.print(ppl);
}





//--------------------------------------------------------------------------------
void reset(){
	pl0=true; //initial marking
	pl1=false;
	}

//--------------------------------------------------------------------------------
//One function per transition
//

//Emitter omitted//
// tr2 Transition 0
//
boolean tr2() {
    if (pl0 && !pl1)
        {

    if (timetr2== -1)
        {timetr2=millis();}
        {if         ((millis()-timetr2 > faceDelay) || (Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.))
        {
stateChanged=true;
        pl0=false;
        pl1=true;
        Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
timetr2=-1;
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
int pn1=random(0,1);
switch (pn1) {
	case 0:
		//Transition 0
		tr2();
		break;
	}
if (stateChanged){
	outputStatusLine();}
}


