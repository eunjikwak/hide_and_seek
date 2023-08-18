let _loc = {};
let taggerSpeed = 120;
let hiderSpeed = 90;
let BURNING = false;
let PLAY_BURNING_SOUND = false;

const WAITING_TIMER = 15;
const OBJ_CNT = 78;

const HIDE_N_SEEK_TIMER = 180;
const HIDE_N_SEEK_INIT_TIMER = 7;
const HIDE_N_SEEK_READY_TIMER = 15;
const STATE_END_TIMER = 7;
const BURNING_TIME = 40

const MIN_PLAYER = 3;
const HEXVALUE = 1000;
const TAGGER_HEALTH = 30;

const STATE_WAITING = 3000;
const STATE_WAITING_TIMER = 3001;
const STATE_INIT = 3002;
const STATE_READY = 3003;
const STATE_PLAYING = 3004;
const STATE_BURNING = 3005;
const STATE_JUDGE = 3006;
const STATE_END = 3007;

let _start = false; // Whether the game starts
let _players = App.players; // App.players : get total players
let _lastSurvivor = null;
let _taggerKing = [];
let _state = STATE_WAITING;
let _stateTimer = 0; // Timer to check status value
let _live = 0; // number of survivors
let _resultstr;


let _objects = [];
let _objects_sprite = [];
let _random_Objects = [];
let _random_coordination = [];

function shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary; 
    }
}


let regame = App.loadSpritesheet("regame2.png");
let regametxt = App.loadSpritesheet("regame_txt.png");
let _tomb = App.loadSpritesheet("tomb.png");
let catcherImg = App.loadSpritesheet('catcher.png', 48, 64, {
  left: [10, 11, 12, 13, 14],      
  up: [7, 6, 5, 8, 9],   
  down: [2, 1, 0, 3, 4],      
  right: [19, 18, 17, 16, 15],
  left_jump: [10],
  up_jump: [7],
  down_jump: [2],
  right_jump: [19],
}, 8);
let _ghost = App.loadSpritesheet('ghost_png.png', 48, 64, {
    left: [8, 9, 10, 11, 10, 9],      
    up: [0, 1, 2, 3],   
    down: [4, 5, 6, 7],      
    right: [12, 13, 14, 15, 14, 13],
    left_jump: [8],
    up_jump: [0],
    down_jump: [4],
    right_jump: [12],
}, 8);



let blue = App.loadSpritesheet("blue.png", 32, 32, [0], 8);
let blank = App.loadSpritesheet("blank_32x32.png", 32, 32, [0], 8);
let blank_c = App.loadSpritesheet("blank_32x32.png", 32, 32, {
    left: [0],      
    up: [0],   
    down: [0],      
    right: [0],
    left_jump: [0],
    up_jump: [0],
    down_jump: [0],
    right_jump: [0],
}, 8);


let obj1 = App.loadSpritesheet('1.png', 32, 64, [0], 8);
let obj1_p = App.loadSpritesheet('1.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj1);
_objects_sprite.push(obj1_p);
let obj10 = App.loadSpritesheet('10.png', 96, 128, [0], 8);
let obj10_p = App.loadSpritesheet('10.png', 96, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj10);
_objects_sprite.push(obj10_p);
let obj11 = App.loadSpritesheet('11.png', 32, 64, [0], 8);
let obj11_p = App.loadSpritesheet('11.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj11);
_objects_sprite.push(obj11_p);
let obj12 = App.loadSpritesheet('12.png', 64, 160, [0], 8);
let obj12_p = App.loadSpritesheet('12.png', 64, 160, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj12);
_objects_sprite.push(obj12_p);
let obj13 = App.loadSpritesheet('13.png', 32, 160, [0], 8);
let obj13_p = App.loadSpritesheet('13.png', 32, 160, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj13);
_objects_sprite.push(obj13_p);
let obj14 = App.loadSpritesheet('14.png', 96, 224, [0], 8);
let obj14_p = App.loadSpritesheet('14.png', 96, 224, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj14);
_objects_sprite.push(obj14_p);
let obj15 = App.loadSpritesheet('15.png', 96, 96, [0], 8);
let obj15_p = App.loadSpritesheet('15.png', 96, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj15);
_objects_sprite.push(obj15_p);
let obj16 = App.loadSpritesheet('16.png', 32, 32, [0], 8);
let obj16_p = App.loadSpritesheet('16.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj16);
_objects_sprite.push(obj16_p);
let obj17 = App.loadSpritesheet('17.png', 50, 175, [0], 8);
let obj17_p = App.loadSpritesheet('17.png', 50, 175, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj17);
_objects_sprite.push(obj17_p);
let obj18 = App.loadSpritesheet('18.png', 64, 32, [0], 8);
let obj18_p = App.loadSpritesheet('18.png', 64, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj18);
_objects_sprite.push(obj18_p);
let obj19 = App.loadSpritesheet('19.png', 32, 64, [0], 8);
let obj19_p = App.loadSpritesheet('19.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj19);
_objects_sprite.push(obj19_p);
let obj2 = App.loadSpritesheet('2.png', 96, 128, [0], 8);
let obj2_p = App.loadSpritesheet('2.png', 96, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj2);
_objects_sprite.push(obj2_p);
let obj20 = App.loadSpritesheet('20.png', 32, 64, [0], 8);
let obj20_p = App.loadSpritesheet('20.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj20);
_objects_sprite.push(obj20_p);
let obj23 = App.loadSpritesheet('23.png', 32, 96, [0], 8);
let obj23_p = App.loadSpritesheet('23.png', 32, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj23);
_objects_sprite.push(obj23_p);
let obj24 = App.loadSpritesheet('24.png', 32, 64, [0], 8);
let obj24_p = App.loadSpritesheet('24.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj24);
_objects_sprite.push(obj24_p);
let obj25 = App.loadSpritesheet('25.png', 64, 32, [0], 8);
let obj25_p = App.loadSpritesheet('25.png', 64, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj25);
_objects_sprite.push(obj25_p);
let obj26 = App.loadSpritesheet('26.png', 64, 192, [0], 8);
let obj26_p = App.loadSpritesheet('26.png', 64, 192, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj26);
_objects_sprite.push(obj26_p);
let obj27 = App.loadSpritesheet('27.png', 96, 160, [0], 8);
let obj27_p = App.loadSpritesheet('27.png', 96, 160, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj27);
_objects_sprite.push(obj27_p);
let obj28 = App.loadSpritesheet('28.png', 96, 96, [0], 8);
let obj28_p = App.loadSpritesheet('28.png', 96, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj28);
_objects_sprite.push(obj28_p);
let obj29 = App.loadSpritesheet('29.png', 128, 96, [0], 8);
let obj29_p = App.loadSpritesheet('29.png', 128, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj29);
_objects_sprite.push(obj29_p);
let obj30 = App.loadSpritesheet('30.png', 32, 64, [0], 8);
let obj30_p = App.loadSpritesheet('30.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj30);
_objects_sprite.push(obj30_p);
let obj31 = App.loadSpritesheet('31.png', 96, 128, [0], 8);
let obj31_p = App.loadSpritesheet('31.png', 96, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj31);
_objects_sprite.push(obj31_p);
let obj32 = App.loadSpritesheet('32.png', 25, 50, [0], 8);
let obj32_p = App.loadSpritesheet('32.png', 25, 50, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj32);
_objects_sprite.push(obj32_p);
let obj33 = App.loadSpritesheet('33.png', 32, 32, [0], 8);
let obj33_p = App.loadSpritesheet('33.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj33);
_objects_sprite.push(obj33_p);
let obj34 = App.loadSpritesheet('34.png', 96, 96, [0], 8);
let obj34_p = App.loadSpritesheet('34.png', 96, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj34);
_objects_sprite.push(obj34_p);
let obj35 = App.loadSpritesheet('35.png', 32, 32, [0], 8);
let obj35_p = App.loadSpritesheet('35.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj35);
_objects_sprite.push(obj35_p);
let obj36 = App.loadSpritesheet('36.png', 100, 200, [0], 8);
let obj36_p = App.loadSpritesheet('36.png', 100, 200, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj36);
_objects_sprite.push(obj36_p);
let obj37 = App.loadSpritesheet('37.png', 75, 200, [0], 8);
let obj37_p = App.loadSpritesheet('37.png', 75, 200, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj37);
_objects_sprite.push(obj37_p);
let obj38 = App.loadSpritesheet('38.png', 32, 32, [0], 8);
let obj38_p = App.loadSpritesheet('38.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj38);
_objects_sprite.push(obj38_p);
let obj39 = App.loadSpritesheet('39.png', 32, 32, [0], 8);
let obj39_p = App.loadSpritesheet('39.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj39);
_objects_sprite.push(obj39_p);
let obj4 = App.loadSpritesheet('4.png', 32, 32, [0], 8);
let obj4_p = App.loadSpritesheet('4.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj4);
_objects_sprite.push(obj4_p);
let obj40 = App.loadSpritesheet('40.png', 32, 64, [0], 8);
let obj40_p = App.loadSpritesheet('40.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj40);
_objects_sprite.push(obj40_p);
let obj41 = App.loadSpritesheet('41.png', 96, 128, [0], 8);
let obj41_p = App.loadSpritesheet('41.png', 96, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj41);
_objects_sprite.push(obj41_p);
let obj42 = App.loadSpritesheet('42.png', 96, 128, [0], 8);
let obj42_p = App.loadSpritesheet('42.png', 96, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj42);
_objects_sprite.push(obj42_p);
let obj43 = App.loadSpritesheet('43.png', 32, 64, [0], 8);
let obj43_p = App.loadSpritesheet('43.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj43);
_objects_sprite.push(obj43_p);
let obj44 = App.loadSpritesheet('44.png', 32, 32, [0], 8);
let obj44_p = App.loadSpritesheet('44.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj44);
_objects_sprite.push(obj44_p);
let obj45 = App.loadSpritesheet('45.png', 32, 64, [0], 8);
let obj45_p = App.loadSpritesheet('45.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj45);
_objects_sprite.push(obj45_p);
let obj46 = App.loadSpritesheet('46.png', 32, 32, [0], 8);
let obj46_p = App.loadSpritesheet('46.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj46);
_objects_sprite.push(obj46_p);
let obj5 = App.loadSpritesheet('5.png', 32, 32, [0], 8);
let obj5_p = App.loadSpritesheet('5.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj5);
_objects_sprite.push(obj5_p);
let obj50 = App.loadSpritesheet('50.png', 32, 32, [0], 8);
let obj50_p = App.loadSpritesheet('50.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj50);
_objects_sprite.push(obj50_p);
let obj51 = App.loadSpritesheet('51.png', 96, 128, [0], 8);
let obj51_p = App.loadSpritesheet('51.png', 96, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj51);
_objects_sprite.push(obj51_p);
let obj52 = App.loadSpritesheet('52.png', 32, 64, [0], 8);
let obj52_p = App.loadSpritesheet('52.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj52);
_objects_sprite.push(obj52_p);
let obj53 = App.loadSpritesheet('53.png', 64, 32, [0], 8);
let obj53_p = App.loadSpritesheet('53.png', 64, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj53);
_objects_sprite.push(obj53_p);
let obj54 = App.loadSpritesheet('54.png', 192, 128, [0], 8);
let obj54_p = App.loadSpritesheet('54.png', 192, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj54);
_objects_sprite.push(obj54_p);
let obj55 = App.loadSpritesheet('55.png', 32, 64, [0], 8);
let obj55_p = App.loadSpritesheet('55.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj55);
_objects_sprite.push(obj55_p);
let obj56 = App.loadSpritesheet('56.png', 32, 32, [0], 8);
let obj56_p = App.loadSpritesheet('56.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj56);
_objects_sprite.push(obj56_p);
let obj57 = App.loadSpritesheet('57.png', 32, 32, [0], 8);
let obj57_p = App.loadSpritesheet('57.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj57);
_objects_sprite.push(obj57_p);
let obj58 = App.loadSpritesheet('58.png', 32, 32, [0], 8);
let obj58_p = App.loadSpritesheet('58.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj58);
_objects_sprite.push(obj58_p);
let obj59 = App.loadSpritesheet('59.png', 64, 64, [0], 8);
let obj59_p = App.loadSpritesheet('59.png', 64, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj59);
_objects_sprite.push(obj59_p);
let obj6 = App.loadSpritesheet('6.png', 32, 96, [0], 8);
let obj6_p = App.loadSpritesheet('6.png', 32, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj6);
_objects_sprite.push(obj6_p);
let obj60 = App.loadSpritesheet('60.png', 32, 64, [0], 8);
let obj60_p = App.loadSpritesheet('60.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj60);
_objects_sprite.push(obj60_p);
let obj61 = App.loadSpritesheet('61.png', 32, 32, [0], 8);
let obj61_p = App.loadSpritesheet('61.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj61);
_objects_sprite.push(obj61_p);
let obj62 = App.loadSpritesheet('62.png', 96, 96, [0], 8);
let obj62_p = App.loadSpritesheet('62.png', 96, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj62);
_objects_sprite.push(obj62_p);
let obj63 = App.loadSpritesheet('63.png', 32, 32, [0], 8);
let obj63_p = App.loadSpritesheet('63.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj63);
_objects_sprite.push(obj63_p);
let obj64 = App.loadSpritesheet('64.png', 32, 96, [0], 8);
let obj64_p = App.loadSpritesheet('64.png', 32, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj64);
_objects_sprite.push(obj64_p);
let obj66 = App.loadSpritesheet('66.png', 64, 32, [0], 8);
let obj66_p = App.loadSpritesheet('66.png', 64, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj66);
_objects_sprite.push(obj66_p);
let obj67 = App.loadSpritesheet('67.png', 96, 96, [0], 8);
let obj67_p = App.loadSpritesheet('67.png', 96, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj67);
_objects_sprite.push(obj67_p);
let obj68 = App.loadSpritesheet('68.png', 32, 32, [0], 8);
let obj68_p = App.loadSpritesheet('68.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj68);
_objects_sprite.push(obj68_p);
let obj69 = App.loadSpritesheet('69.png', 100, 175, [0], 8);
let obj69_p = App.loadSpritesheet('69.png', 100, 175, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj69);
_objects_sprite.push(obj69_p);
let obj7 = App.loadSpritesheet('7.png', 175, 125, [0], 8);
let obj7_p = App.loadSpritesheet('7.png', 175, 125, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj7);
_objects_sprite.push(obj7_p);
let obj71 = App.loadSpritesheet('71.png', 100, 200, [0], 8);
let obj71_p = App.loadSpritesheet('71.png', 100, 200, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj71);
_objects_sprite.push(obj71_p);
let obj72 = App.loadSpritesheet('72.png', 96, 96, [0], 8);
let obj72_p = App.loadSpritesheet('72.png', 96, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj72);
_objects_sprite.push(obj72_p);
let obj73 = App.loadSpritesheet('73.png', 32, 32, [0], 8);
let obj73_p = App.loadSpritesheet('73.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj73);
_objects_sprite.push(obj73_p);
let obj74 = App.loadSpritesheet('74.png', 32, 96, [0], 8);
let obj74_p = App.loadSpritesheet('74.png', 32, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj74);
_objects_sprite.push(obj74_p);
let obj75 = App.loadSpritesheet('75.png', 32, 64, [0], 8);
let obj75_p = App.loadSpritesheet('75.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj75);
_objects_sprite.push(obj75_p);
let obj76 = App.loadSpritesheet('76.png', 96, 96, [0], 8);
let obj76_p = App.loadSpritesheet('76.png', 96, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj76);
_objects_sprite.push(obj76_p);
let obj77 = App.loadSpritesheet('77.png', 32, 96, [0], 8);
let obj77_p = App.loadSpritesheet('77.png', 32, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj77);
_objects_sprite.push(obj77_p);
let obj78 = App.loadSpritesheet('78.png', 32, 64, [0], 8);
let obj78_p = App.loadSpritesheet('78.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj78);
_objects_sprite.push(obj78_p);
let obj79 = App.loadSpritesheet('79.png', 32, 96, [0], 8);
let obj79_p = App.loadSpritesheet('79.png', 32, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj79);
_objects_sprite.push(obj79_p);
let obj8 = App.loadSpritesheet('8.png', 32, 64, [0], 8);
let obj8_p = App.loadSpritesheet('8.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj8);
_objects_sprite.push(obj8_p);
let obj80 = App.loadSpritesheet('80.png', 32, 96, [0], 8);
let obj80_p = App.loadSpritesheet('80.png', 32, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj80);
_objects_sprite.push(obj80_p);
let obj81 = App.loadSpritesheet('81.png', 32, 32, [0], 8);
let obj81_p = App.loadSpritesheet('81.png', 32, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj81);
_objects_sprite.push(obj81_p);
let obj82 = App.loadSpritesheet('82.png', 96, 128, [0], 8);
let obj82_p = App.loadSpritesheet('82.png', 96, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj82);
_objects_sprite.push(obj82_p);
let obj83 = App.loadSpritesheet('83.png', 32, 96, [0], 8);
let obj83_p = App.loadSpritesheet('83.png', 32, 96, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj83);
_objects_sprite.push(obj83_p);
let obj84 = App.loadSpritesheet('84.png', 32, 64, [0], 8);
let obj84_p = App.loadSpritesheet('84.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj84);
_objects_sprite.push(obj84_p);
let obj85 = App.loadSpritesheet('85.png', 64, 32, [0], 8);
let obj85_p = App.loadSpritesheet('85.png', 64, 32, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj85);
_objects_sprite.push(obj85_p);
let obj86 = App.loadSpritesheet('86.png', 32, 64, [0], 8);
let obj86_p = App.loadSpritesheet('86.png', 32, 64, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj86);
_objects_sprite.push(obj86_p);
let obj9 = App.loadSpritesheet('9.png', 64, 128, [0], 8);
let obj9_p = App.loadSpritesheet('9.png', 64, 128, { left: [0], up: [0], down: [0], right: [0], left_jump: [0], up_jump: [0], down_jump: [0], right_jump: [0], }, 8);
_objects.push(obj9);
_objects_sprite.push(obj9_p);

let _lotto = Array(OBJ_CNT).fill().map((v,i)=> i);



function is_Ok_To_Waiting_Timer() {
    let _playerCnt = App.playerCount;
    if (_playerCnt < MIN_PLAYER) {
        App.showCenterLabel(`게임 최소 시작 인원은 ${MIN_PLAYER}명 입니다. \n\n 현재 ${_playerCnt}명`);
        return false;
    }

    if (_playerCnt >= MIN_PLAYER) {
        return true;
    }
};

function grade(score) {
    let gradeText = '';
    if (score >= 500) {
        gradeText = `💎다이아(${score}점)`;
    } else if (score >= 300) {
        gradeText = `🥇골드(${score}점)`;
    } else if (score >= 100) {
        gradeText = `🥈실버(${score}점)`;
    } else {
        gradeText = `🥉일반(${score}점)`;
    }
    return gradeText;
}

let rankDB = {
    currentRank:{},
    accumulation:{}
}

if (App.storage == null) {
    App.storage = "{}"
    let appStorage = JSON.parse(App.storage)
    appStorage = rankDB
    App.storage = JSON.stringify(appStorage)
    App.save()
}


// 모든 플레이어를 이 이벤트를 통해 App에 진입시킴
App.onJoinPlayer.Add(function(player)  {
    let p = player;
    let appStorage = JSON.parse(App.storage);
    let score
    if(p.isGuest) {
        p.title = "GUEST"
        p.sendUpdated();
    }else {
        if (!appStorage["currentRank"]) {
        appStorage["currentRank"] = {};
        }
        if (!appStorage["currentRank"][player.name]) {
            appStorage["currentRank"][player.name] = {
                name: player.name,
                score: 0
            };
        }

        if(!appStorage["accumulation"]){
            appStorage["accumulation"] = {};
        }
        if (!appStorage["accumulation"][player.name]) {
            appStorage["accumulation"][player.name] = {
                name: player.name,
                score: 0
            };
            score = Number(appStorage["accumulation"][player.name].score)
            p.title = grade(score)
            p.sendUpdated();
        }else {
            score = Number(appStorage["accumulation"][player.name].score)
            p.title = grade(score)
            p.sendUpdated();
        }
        App.storage = JSON.stringify(appStorage);
        App.save();
    }
    
    p.tag = {};
    if(p.role >= 3000) {
        App.sayToAll(`관리자가 입장했습니다. // ${p.name}`, 0x00FF00);
        App.showCenterLabel(`관리자가 입장했습니다. // ${p.name}`, 0xFFFF00);
    }  

    if (_start) {

        p.tag.catched = true;
        p.sprite = _ghost;
        p.hidden = false;
        p.title += "\n탈락자 ㅠㅠ";
        p.sendUpdated();
        if(p.isMobile) {
            p.tag.timer = p.showWidget("timer.html", "top", 200, 150);
        }else {
            p.tag.timer = p.showWidget("timer.html", "sidebar", 200, 150);
        }
        judgement(checkSurvivors());
    };

    if (_state == STATE_PLAYING || _state == STATE_BURNING) {
        if(p.isMobile) {
            p.tag.timer = p.showWidget("timer.html", "top", 200, 150);
        }else {
            p.tag.timer = p.showWidget("timer.html", "sidebar", 200, 150);
        }
    }

    _players = App.players;
});


function playBurningSound() {

}

// 이벤트 콜백 처리 후 다시 onUpdate

// App 종료 시 모든 플레이어를 App에서 나가게 함
App.onLeavePlayer.Add(function(player){
    if(_start) {
        judgement(checkSurvivors());  
    }
    let p = player;
    if(p.hidden) {
        let objX = (Math.floor(_objects[p.tag.objectIdx].frameWidth / 32) - 1) / 2;
        let objY = Math.ceil(_objects[p.tag.objectIdx].frameHeight / 32) - 1;    
        Map.putObject(p.tag.objX, p.tag.objY, null);

        for (let i = 0; i <= objX * 2; i++) {
            for (let j = 0; j <= objY; j++) { 
                let arrIdx = _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j].indexOf(p);
                _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j].splice(arrIdx, 1);
                if(i == 0 && j == 0) {
                    continue;
                } else {
                    Map.putObject(p.tag.objX + i, p.tag.objY + j, null);
                }
            }
        }  
    }
    p.sprite = null;
    p.moveSpeed = 80;
    p.hidden = false;
    p.title = null;
    p.sendUpdated();
    if(_start) {
        _tagger_live = 0;
        _tagger_live = checkTagger();
        _live = checkSurvivors();
        p.playSoundLink("https://rid-hide-n-seek.s3.ap-northeast-2.amazonaws.com/bgms/06_end_hns_no_tagger.mp3", false);
        if(_tagger_live <= 0) {
            App.showCenterLabel("모든 술래가 나갔습니다.");
            App.sayToAll("모든 술래가 나가서 게임을 종료합니다.");
            startState(STATE_JUDGE);
        }else if(_live <= 0) {
            startState(STATE_JUDGE);
        }
    }

    _players = App.players;
});

// App 종료 시 마지막으로 호출
// Normal App과 Sidebar App은 별도의 종료
App.onDestroy.Add(function(){
    let _players = App.players;
    for (let i in _players) {
        let p = _players[i];
        p.sprite = null;
        p.moveSpeed = 80;
        p.hidden = false;
        p.title = null;
        p.sendUpdated();
    }
});



function startApp() {
    _players = App.players;

    if (_players.length >= MIN_PLAYER) {
        App.cameraEffect = 1;
        App.cameraEffectParam1 = 800;
        App.sendUpdated();

        let taggerCnt = Math.floor(_players.length * 0.2);
        if (taggerCnt < 1) {
            taggerCnt = 1;
        }

        let allPlayer = [];
        let taggerIdx = [];
        
        for (let i = 0; i < _players.length; i++) {
            allPlayer.push(_players[i]);
        }

        for (let i = 0; i < taggerCnt; i++) {
            let index = Math.floor(allPlayer.length * Math.random());
            if (!taggerIdx.includes(allPlayer[index].id)) {
                taggerIdx.push(allPlayer[index].id);
                allPlayer.splice(index, 1);
            }
        }


        for (let i in _players) {
            let p = _players[i];
            let appStorage = JSON.parse(App.storage)
            if(!p.isGuest) {
            score = Number(appStorage["accumulation"][p.name].score)
            p.title = grade(score);
            } else {
                p.title ="GUEST"
            }
            if(p.isMobile) {
                p.tag.timer = p.showWidget("timer.html", "top", 200, 150);
            }else {
                p.tag.timer = p.showWidget("timer.html", "sidebar", 200, 150);
            }
           
            p.tag.timer.sendMessage(0);

            if (taggerIdx.includes(p.id)) {
                p.tag.tagger = true;
                p.tag.health = TAGGER_HEALTH;
                p.tag.tagger_failed = false;
                p.sprite = catcherImg;
                p.moveSpeed = 0;
                p.title += `\n술래|hp:${p.tag.health}`;
                p.spawnAtLocation("tagger_start_area");
            } else {
                p.tag.hide = false;
                p.tag.objX = 0;
                p.tag.objY = 0;
                shuffle(_lotto);
                p.tag.hider = true;
                p.tag.objectIdx = _lotto[0];
                _live++;
            }

            p.sendUpdated();
        }
        App.playSoundLink("https://rid-hide-n-seek.s3.ap-northeast-2.amazonaws.com/bgms/01_waiting_hns.mp3", false);
        _start = true;

    } else {
        App.showCenterLabel(`${MIN_PLAYER}명 이상의 플레이어가 필요합니다.`);
        startState(STATE_WAITING);
    }
}


function startState(state) {
    _state = state;
    
    switch (_state) {
        case STATE_WAITING:
            _stateTimer = WAITING_TIMER;
            break;
        case STATE_WAITING_TIMER:
            break;        
        case STATE_INIT:
            startApp();
            _stateTimer = HIDE_N_SEEK_INIT_TIMER;
            // shuffle(_random_coordination);
            // for(let i in _random_coordination) {
            //     let random_coordinate = _random_coordination[i];
            //     shuffle(_random_Objects);
            //     Map.putObject(random_coordinate.x, random_coordinate.y, _random_Objects[0]);
            // }              
            break;
        case STATE_READY:
            _stateTimer = HIDE_N_SEEK_READY_TIMER;
            _players = App.players;
            App.showCenterLabel("게임이 곧 시작됩니다.\nThe game will start soon.");
            
            for (let i in _players) {
                let p = _players[i];
                if (p.tag.tagger) {
                    p.playSoundLink("https://rid-hide-n-seek.s3.ap-northeast-2.amazonaws.com/bgms/02_play_hns_tagger.mp3", false);
                    
                    p.tag.catchCnt = 0;
                    p.moveSpeed = 0;
                } else if (p.title.includes("탈락자 ㅠㅠ")) {
                    p.sprite=_ghost;
                } else {
                    p.playSoundLink("https://rid-hide-n-seek.s3.ap-northeast-2.amazonaws.com/bgms/02_play_hns_runner.mp3", false);
                    p.moveSpeed = 150;
                    p.sprite = _objects_sprite[p.tag.objectIdx];
                    p.tag.catched = false;
                    p.spawnAtLocation('game_start_area');
                }
                App.cameraEffect = 1;
                App.cameraEffectParam1 = 1000;
                App.sendUpdated();
                p.sendUpdated();
            }
            break;
        case STATE_PLAYING:
            _stateTimer = HIDE_N_SEEK_TIMER;
            for (let i in _players) {
                let p = _players[i];
                
                if (p.tag.tagger) {
                    p.showCenterLabel("Z키로 사물을 공격하여 숨어있는 플레이어를 찾으세요!");
                    p.playSoundLink("https://rid-hide-n-seek.s3.ap-northeast-2.amazonaws.com/bgms/03_playing_tagger.mp3", false);
                    p.moveSpeed = taggerSpeed;
                } else if (p.tag.hider &&!p.tag.catched) {
                    p.showCenterLabel(`변신이 풀립니다!! 이제부터 "X" 키를 눌러 ID를 숨길 수 있습니다.\n꽁꽁 숨어라~`);
                    p.playSoundLink("https://rid-hide-n-seek.s3.ap-northeast-2.amazonaws.com/bgms/03_playing_runner.mp3", false);
                    p.sprite = null;
                    p.moveSpeed = hiderSpeed;
                } else if (p.title.includes("탈락자 ㅠㅠ")) {
                    p.showCenterLabel(`탈락자테스트`);
                    p.sprite=_ghost;
                }         
                p.sendUpdated();
            }

            break;
        case STATE_BURNING:
            App.playSoundLink("https://rid-hide-n-seek.s3.ap-northeast-2.amazonaws.com/bgms/04_play_hns_burning.mp3", false);
             //버닝모드일때 술래가 160까지 스피드늘어남
             for (let i in _players) {
                let p = _players[i];
                if (p.tag.tagger) {
                    p.moveSpeed = 160;
                } 
                p.sendUpdated();
            }
            break;
        case STATE_JUDGE:
            _stateTimer = 5;
            for(let i in _players) {
                let p = _players[i];
                p.moveSpeed = 0;
                p.sendUpdated();
            }
            judgement(_live);
            
            break;
        case STATE_END:
            _stateTimer = STATE_END_TIMER;
            App.playSoundLink("https://rid-hide-n-seek.s3.ap-northeast-2.amazonaws.com/bgms/05_end_hns.mp3", false);
            if(!_start) {
                return;
            }
            _stateTimer = 3;
            _start = false;
            
            for(let i in _players)
            {
                let p = _players[i];
                if (p.tag.timer) {
                    p.tag.timer.destroy();
                }
                if(p.tag.personal_rank_widget){
                    p.tag.personal_rank_widget.destroy();
                }
                let appStorage = JSON.parse(App.storage);
                p.tag = {};
                if(!p.isGuest) {
                    let score = Number(appStorage["accumulation"][p.name].score);
                    p.title = grade(score);
                }else {
                    p.title = "GUEST"
                }
                
                p.hidden = false;
                p.moveSpeed = 80;
                p.sprite = null;
                p.sendUpdated();
                p.spawnAtLocation('game_end_area');
            }
            BURNING = false;
            Map.clearAllObjects();
            App.cameraEffect = 0;
            App.sendUpdated();
            Map.clearAllObjects();            
            break;
    }
}


// 20ms 마다 호출되는 이벤트
// dt: deltatime(전 프레임이 완료되기까지 걸린 시간)
App.onUpdate.Add(function(dt){
    _stateTimer -= dt;
    _players = App.players;

    switch(_state) {
        case STATE_WAITING:
            if (is_Ok_To_Waiting_Timer()) {
                startState(STATE_WAITING_TIMER);
            }

            break;
        case STATE_WAITING_TIMER:
            App.showCenterLabel(`${_stateTimer.toFixed(0)} 초 후에 게임이 시작됩니다.`);
            if (!is_Ok_To_Waiting_Timer()) {
                startState(STATE_WAITING);
            }

            if (_stateTimer < 0) {
                startState(STATE_INIT);
            }
            break;   
        case STATE_INIT:
            App.showCenterLabel("숨바꼭질이 곧 시작됩니다. 사물로 변신할 사람들과 술래를 정합니다.");   
            for (let i in _players) {
                let p = _players[i];
                p.tag.timer.sendMessage(_stateTimer);
            }       
            if (_stateTimer <= 0) {
                startState(STATE_READY);
            }
            break;
        case STATE_READY:
            App.showCenterLabel(`${HIDE_N_SEEK_READY_TIMER}초간 꽁꽁 숨어보세요!! 술래는 움직일 수 없습니다!\n${HIDE_N_SEEK_READY_TIMER}초 동안 내가 변신할 사물을 확인하세요!`);
            for (let i in _players) {
                let p = _players[i];
                p.tag.timer.sendMessage(_stateTimer);
            }
            if (_stateTimer <= 0) {
                startState(STATE_PLAYING);
            }
            break;
        case STATE_PLAYING:
            for (let i in _players) {
                let p = _players[i];
                p.tag.timer.sendMessage(_stateTimer);
            }
            if (_stateTimer <= BURNING_TIME) {
                BURNING = true;
                App.showCenterLabel(`버닝모드 활성화!! 술래들의 체력이 닳지 않습니다.`);
                startState(STATE_BURNING);
            }

            break;
        case STATE_BURNING:
            for (let i in _players) {
                let p = _players[i];
                p.tag.timer.sendMessage(_stateTimer);
            }

            if (_stateTimer <= 0) {
                startState(STATE_JUDGE);
            }

            break;
        case STATE_JUDGE:
            judgement2();
            App.showCenterLabel(_resultstr);
            for (let i in _players) {
                let p = _players[i];
                p.tag.timer.sendMessage(_stateTimer);
            }
            if (_stateTimer <=  0) {
                scoreUpdate();
                startState(STATE_END);
            }
            break;
        case STATE_END:      
            if (_stateTimer <=  0) {
                startState(STATE_WAITING);
            }            
            break;
    };

});


App.addOnKeyDown(88, function(player){
    if (_state == STATE_PLAYING || _state == STATE_BURNING) {
        
    } else {
        return;
    }
    let p = player;
    
    if (p.tag.hider && !p.tag.catched) {

    } else {
        return;
    }

    let _current_location = p.getLocationName();
    if (_current_location == "cannot_hide") {
        p.showCenterLabel(`이곳에는 숨을 수 없습니다.`);
        return;
    }

    let objX = Math.ceil((Math.ceil(_objects[p.tag.objectIdx].frameWidth / 32) - 1) / 2);
    let objY = Math.ceil(_objects[p.tag.objectIdx].frameHeight / 32) - 1;    

    if (p.tag.hide) {
        p.hidden = false;
        p.moveSpeed = hiderSpeed;
        p.tag.hide = false;
        let appStorage = JSON.parse(App.storage);
        if(!p.isGuest){
            let score =Number(appStorage["accumulation"][p.name].score)
            p.title = grade(score);
        }else {
            p.title = "GUEST";
        }
        p.sprite = null;
        p.sendUpdated();

        Map.putObject(p.tag.objX, p.tag.objY, null);
        for (let i = 0; i <= objX * 2; i++) {
            for (let j = 0; j <= objY; j++) { 
                let arrIdx = _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j].indexOf(p);
                _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j].splice(arrIdx, 1);
                _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j] = null;
                if((i == 0) && (j == 0)) {
                    continue;
                } else {
                    Map.putObject(p.tag.objX + i, p.tag.objY + j, null);
                }
            }
        }
    } else if (!p.tag.hide) {
        p.tag.objX = (p.tileX - objX);
        p.tag.objY = (p.tileY - objY);
        for (let i = 0; i <= objX * 2; i++) {
            for (let j = 0; j <= objY; j++) { 
                if (_loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j]) {
                    p.showCenterLabel("원하는 지점에 누군가 숨어있습니다!");
                    return;
                };
            };
        };

        p.hidden = true;
        p.moveSpeed = 0;
        p.title += "\n숨김 상태"
        p.tag.hide = true;
        
        p.sprite = blank_c;

        p.sendUpdated();

        Map.putObject(p.tag.objX, p.tag.objY, _objects[p.tag.objectIdx]);
        for (let i = 0; i <= objX * 2; i++) {
            for (let j = 0; j <= objY; j++) { 
                if(!_loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j]) {
                    _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j] = [];
                };
                _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j].push(p);
                if((i == 0) && (j == 0)) {
                    continue;
                } else {
                    Map.putObject(p.tag.objX + i, p.tag.objY + j, blank);
                };
            };
        };
    };
});

App.addMobileButton(8, 145, 75, function(player) {
    if (_state == STATE_PLAYING || _state == STATE_BURNING) {
        
    } else {
        return;
    }
    let p = player;
    
    if (p.tag.hider && !p.tag.catched) {

    } else {
        return;
    }
    let _current_location = p.getLocationName();
    if (_current_location == "cannot_hide") {
        p.showCenterLabel(`이곳에는 숨을 수 없습니다.`);
        return;
    }

    let objX = Math.ceil((Math.ceil(_objects[p.tag.objectIdx].frameWidth / 32) - 1) / 2);
    let objY = Math.ceil(_objects[p.tag.objectIdx].frameHeight / 32) - 1;    

    if (p.tag.hide) {
        p.hidden = false;
        p.moveSpeed = hiderSpeed;
        p.tag.hide = false;
        let appStorage = JSON.parse(App.storage);
        if(!p.isGuest){
            let score =Number(appStorage["accumulation"][p.name].score)
            p.title = grade(score);
        }else {
            p.title = "GUEST";
        }
      
        p.sprite = null;
        p.sendUpdated();

        Map.putObject(p.tag.objX, p.tag.objY, null);
        for (let i = 0; i <= objX * 2; i++) {
            for (let j = 0; j <= objY; j++) { 
                let arrIdx = _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j].indexOf(p);
                _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j].splice(arrIdx, 1);
                _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j] = null;
                if((i == 0) && (j == 0)) {
                    continue;
                } else {
                    Map.putObject(p.tag.objX + i, p.tag.objY + j, null);
                }
            }
        }
    } else if (!p.tag.hide) {
        p.tag.objX = (p.tileX - objX);
        p.tag.objY = (p.tileY - objY);
        for (let i = 0; i <= objX * 2; i++) {
            for (let j = 0; j <= objY; j++) { 
                if (_loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j]) {
                    p.showCenterLabel("원하는 지점에 누군가 숨어있습니다!");
                    return;
                };
            };
        };

        p.hidden = true;
        p.moveSpeed = 0;
        p.title += "\n숨김 상태"
        p.tag.hide = true;
        
        p.sprite = blank_c;

        p.sendUpdated();

        Map.putObject(p.tag.objX, p.tag.objY, _objects[p.tag.objectIdx]);
        for (let i = 0; i <= objX * 2; i++) {
            for (let j = 0; j <= objY; j++) { 
                if(!_loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j]) {
                    _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j] = [];
                };
                _loc[(p.tag.objX + i) * HEXVALUE + p.tag.objY + j].push(p);
                if((i == 0) && (j == 0)) {
                    continue;
                } else {
                    Map.putObject(p.tag.objX + i, p.tag.objY + j, blank);
                };
            };
        };
    };
});



App.onUnitAttacked.Add(function(sender, x, y, target) {
    if (sender.tag.hider) {
        return;
    };
    if (!target.tag.hider) {
        return;
    };
    if (sender.tag.tagger_failed) {
        return;
    };
    if (target.hidden) {
        return;
    };
   
    if (!target.tag.catched) {
        target.tag.catched = true;
        target.sprite = _ghost;
        target.hidden = false;
        target.moveSpeed = 80;
        target.title += "\n탈락자 ㅠㅠ";  
    
        sender.tag.catchCnt++;
        if(sender.tag.health < 10) {
            sender.tag.health += 1;
        }
        target.sendUpdated();
        sender.sendUpdated();
        _live = checkSurvivors();
    } else {
        return;
    }

    if (_live >= 1) {
        App.showCenterLabel(`${target.name}이 잡혔습니다. \n${_live}명이 숨어있습니다!`)
        return;
    } else {
        startState(STATE_JUDGE);
    }    
});



// 키 다운 이벤트가 먼저임..
App.addOnKeyDown(90, function(player){
    let appStorage = JSON.parse(App.storage)
    if(!_start) {
        return;
    }

    let _tagger_live = 0;
    let p = player;
    if (!p.tag.tagger) {
        return;
    };

    if (BURNING) {
        return;
    }

    if (p.tag.health > 0) {
        p.tag.health--;
        if(!p.isGuest){
            let score = Number(appStorage["accumulation"][p.name].score)
            p.title = grade(score);
        }else {
            p.title = "GUEST";
        }
        p.title += `\n술래|hp:${p.tag.health}`;
        p.sendUpdated();
    }

    App.runLater(function() {
        if(p.tag.health <= 0) {
            p.tag.tagger_failed = true;
            if(!p.isGuest){
                let score = Number(appStorage["accumulation"][p.name].score)
                p.title = grade(score);
            }else {
                p.title = "GUEST";
            }
            p.title += `\n술래|hp:${p.tag.health} 탈락!`;
            p.sendUpdated(); 
        }
        _tagger_live = checkTagger();
        if(_tagger_live <=0) {
            App.showCenterLabel("모든 술래가 나갔습니다.");
            startState(STATE_JUDGE);
        }
    }, 0.5);
});

App.onObjectAttacked.Add(function(sender, x, y){
    let _target = null
    let appStorage = JSON.parse(App.storage);
    let _players = App.players;
    if (!sender.tag.tagger) {
        return;
    };
    if (sender.tag.tagger_failed) {
        return;
    };

    if (_loc[x * HEXVALUE + y]) {
        for (let i in _loc[x * HEXVALUE + y]) {
            _target = _loc[x * HEXVALUE + y][i];
            sender.tag.catchCnt++;
            sender.sendUpdated();
            if (sender.tag.health < 10) {
                sender.tag.health++;
                if(!sender.isGuest){
                    let score = Number(appStorage["accumulation"][sender.name].score)
                    sender.title = grade(score);
                }else {
                    sender.title = "GUEST";
                }
                sender.title += `\n술래|hp:${sender.tag.health}`;
                sender.sendUpdated();
            }      
            
            _target.tag.catched = true;
            _target.sprite = _ghost;
            _target.hidden = false;
            if(!_target.isGuest){
                let score = Number(appStorage["accumulation"][_target.name].score)
                _target.title = grade(score);
            }else {
                _target.title = "GUEST";
            }
            _target.title += "\n탈락자 ㅠㅠ";
            _target.moveSpeed = 80;

            let objX = (Math.floor(_objects[_target.tag.objectIdx].frameWidth / 32) - 1) / 2;
            let objY = Math.ceil(_objects[_target.tag.objectIdx].frameHeight / 32) - 1;    
            Map.putObject(_target.tag.objX, _target.tag.objY, null);

            for (let i = 0; i <= objX * 2; i++) {
                for (let j = 0; j <= objY; j++) { 
                    let arrIdx = _loc[(_target.tag.objX + i) * HEXVALUE + _target.tag.objY + j].indexOf(_target);
                    _loc[(_target.tag.objX + i) * HEXVALUE + _target.tag.objY + j].splice(arrIdx, 1);
                    if(i == 0 && j == 0) {
                        continue;
                    } else {
                        Map.putObject(_target.tag.objX + i, _target.tag.objY + j, null);
                    }
                }
            }       
            _target.sendUpdated();
            _live = checkSurvivors();
        }

    }

    if (_live >= 1) {
            App.showCenterLabel(`${_target.name}이 잡혔습니다. \n${_live}명이 숨어있습니다!`)
            return;
    } else {
            startState(STATE_JUDGE);
    }

});



function checkSurvivors() {
    let resultLive = 0;
    _players = App.players;
    for (let i in _players) {
        let p = _players[i];
        if (p.tag.hider && !p.tag.catched) {
            _lastSurvivor = p;
            ++resultLive;
        }
    }

    return resultLive;
}

function checkTagger() {
    let resultTaggerLive = 0;
    _players = App.players;
    for (let i in _players) {
        let p = _players[i];
        if (p.tag.tagger && !p.tag.tagger_failed) {
            ++resultTaggerLive;
        }
    }

    return resultTaggerLive;    
}


function judgement(number) {
    let catched = 0;

    _players = App.players;
    for (let i in _players) {
        let p = _players[i];

        if (p.tag.tagger) {
            if (p.tag.catchCnt > catched) {
                catched = p.tag.catchCnt;
            }
        }
    }

    taggerKing = [];
    if (catched > 0) {
        for (let i in _players) {
            let p = _players[i];

            if (p.tag.tagger) {
                if (p.tag.catchCnt == catched) {
                    taggerKing.push(p.name);
                    p.sendUpdated();
                }
            }
        }
    }

    hiderKing = [];
    for (let i in _players) {
        let p = _players[i];

        if (p.tag.hider && !p.tag.catched) {
            hiderKing.push(p.name);
            p.sendUpdated();
        }
    }

    if (number >= 1) {
        _resultstr = `최강 술래 ${JSON.stringify(taggerKing)}\n숨기의 달인 ${JSON.stringify(hiderKing)}`;
    } else if (number == 0) {
        _resultstr = `더 이상 숨어있는 사람이 없습니다.\n최강 술래 ${JSON.stringify(taggerKing)}`;
    }
}

function scoreUpdate() {
    let catched = 0;
    _players = App.players;
    for (let i in _players) {
        let p = _players[i];

        if (p.tag.tagger) {
            if (p.tag.catchCnt > catched) {
                catched = p.tag.catchCnt;
            }
        }
    }

    taggerKing = [];
    if (catched > 0) {
        for (let i in _players) {
            let p = _players[i];

            if (p.tag.tagger) {
                if (p.tag.catchCnt == catched) {
                    taggerKing.push(p.name);
                    p.sendUpdated();
                }
            }
        }
    }

    hiderKing = [];
    for (let i in _players) {
        let p = _players[i];

        if (p.tag.hider && !p.tag.catched) {
            hiderKing.push(p.name);
            p.sendUpdated();
        }
    }

    let appStorage = JSON.parse(App.storage);
    let currentRank = appStorage["currentRank"];
    let accumulation = appStorage["accumulation"];
    let number = checkSurvivors();
    if (number >=1) {
        for (let i in currentRank) {
            for(let j in hiderKing) {
                if (currentRank[i].name === hiderKing[j]) {
                    currentRank[i].score +=1;
                    break;
                } 
            }
        }
        for (let i in accumulation) {
            for(let j in hiderKing) {
                if (accumulation[i].name === hiderKing[j]) {
                    accumulation[i].score +=1;
                    break;
                } 
            }
        }
    } else if (number ==0) {//술래가이김
        for (let i in currentRank) {
            for(let j in taggerKing) {
                if (currentRank[i].name === taggerKing[j]) {
                    currentRank[i].score +=10;
                    break;
                } 
            }
        }
            for (let i in accumulation) {
            for(let j in taggerKing) {
                if (accumulation[i].name === taggerKing[j]) {
                    accumulation[i].score +=10;
                    break;
                } 
            }
        }
    }
    
    appStorage["currentRank"] = currentRank;
    appStorage["accumulation"] = accumulation;
    App.storage = JSON.stringify(appStorage);
    App.save()
}


function judgement2() {
    let catched = 0;
    let appStorage = JSON.parse(App.storage);
    _players = App.players;
    for (let i in _players) {
        let p = _players[i];

        if (p.tag.tagger) {
            if (p.tag.catchCnt > catched) {
                catched = p.tag.catchCnt;
            }
        }
    }

    taggerKing = [];
    for (let i in _players) {
        let p = _players[i];

        if (p.tag.tagger) {
            if (p.tag.catchCnt == catched) {
                taggerKing.push(p.name);
                if(!p.isGuest){
                    let score = Number(appStorage["accumulation"][p.name].score)
                    p.title = grade(score);
                }else {
                    p.title = "GUEST";
                }
                p.title += "\n최강 술래";
                p.sendUpdated();
            }
        }
    }

    hiderKing = [];
    for (let i in _players) {
        let p = _players[i];

        if (p.tag.hider && !p.tag.catched) {
            hiderKing.push(p.name);
            if(!p.isGuest){
                let score = Number(appStorage["accumulation"][p.name].score)
                p.title = grade(score);
            }else {
                p.title = "GUEST";
            }
            p.title += "\n숨기의 달인";
            p.sendUpdated();
        }
    }
}

App.onSay.Add(function(player, text) {
    App.httpPost("https://discord.com/api/webhooks/999663070735507516/znPchj0MiQdB8vODIw0hhTGxGDak839-yoeHMraIwrHgiAcZN3LnaXRjlE3BeMVnkOBk", {
        }, {
            "username": `${player.name}`,
            "content": `${text}`
        }, (res) => {
            
    });

});


// 랭킹보드 초기화
App.onSay.Add(function(player, msg) {
    if (player.role < 1000) return;
    if (msg == "rank clear") {
      let appStorage = JSON.parse(App.storage)
      appStorage.currentRank={}
      if (!appStorage["currentRank"]) {
        appStorage["currentRank"] = {};
        }
    let _players = App.players
    for (let i in _players) {
        let p = _players[i];
    if (!appStorage["currentRank"][p.name]) {
        appStorage["currentRank"][p.name] = {
            name: p.name,
            score: 0
        };
     }
    }
    App.storage = JSON.stringify(appStorage);
    App.save();
    }else if (msg == "rank clear All") {
        let appStorage = JSON.parse(App.storage)
        appStorage.currentRank={}
        appStorage.accumulation={}
        if (!appStorage["currentRank"]) {
          appStorage["currentRank"] = {};
        }
        if (!appStorage["accumulation"]) {
          appStorage["accumulation"] = {};
        }
      let _players = App.players;
      for (let i in _players) {
          let p = _players[i];
            if (!appStorage["currentRank"][p.name]) {
                appStorage["currentRank"][p.name] = {
                    name: p.name,
                    score: 0
                };
            }
            if (!appStorage["accumulation"][p.name]) {
                appStorage["accumulation"][p.name] = {
                    name: p.name,
                    score: 0
                };
            }
      }
      
      App.storage = JSON.stringify(appStorage);
      App.save();
        
    }
  });

App.onObjectTouched.Add(function (sender, x, y, tileID, obj) {
    if (obj !== null) {
        if (obj.type == ObjectEffectType.INTERACTION_WITH_ZEPSCRIPTS) {
            if(obj.param1 ==='rank_box'){
                if (sender.tag.personal_rank_widget_open) {
                    sender.tag.personal_rank_widget.destroy();
                    sender.tag.personal_rank_widget=null
                    sender.tag.personal_rank_widget_open = false
                    return;
                  }
                sender.tag.personal_rank_widget = sender.showWidget("team_rank.html", "bottomleft", 480, 500)
                sender.tag.personal_rank_widget_open = true
                sender.tag.personal_rank_widget.sendMessage(App.storage);
                sender.sendUpdated();
                sender.tag.personal_rank_widget.onMessage.Add(function(player, data){
                    if(data.type =="close") {
                        player.tag.personal_rank_widget.destroy();
                        player.tag.personal_rank_widget=null
                        player.tag.personal_rank_widget_open = false
                    }
                });
                sender.sendUpdated();
            }
        }
    } else {
        //App.sayToAll(`obj is null`, 0xFFFFFF);
    }
});


App.addOnKeyDown(71, function (player) {
    if (player.role < 1000) return;
    let p = player;
    if (p.tag.personal_rank1_widget_open) {
      p.tag.personal_rank1_widget.destroy();
      p.tag.personal_rank1_widget_open = false
      return
    }
    p.tag.personal_rank1_widget = p.showWidget("team_rank1.html", "middle", 480, 500)
    p.tag.personal_rank1_widget_open = true
    p.tag.personal_rank1_widget.sendMessage(App.storage);
    p.sendUpdated();
});

