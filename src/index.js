const puppeteer = require('puppeteer');

const { sorteio } = require('./uri_s.json');
const { followers } = require('./followers.json')

const login = require('./modules/login.js');
const goToDraw = require('./modules/goToDraw.js');
const comment = require('./modules/comment');

var list = followers;

async function init() {
  var controlComments = 1;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=770,720']
  });
  const page = await browser.newPage();

  await login(page);
  await goToDraw(page, sorteio);
  
  // começar a comentar
  for (const follow of list) {
    console.log(list.length)
    list.shift();
    
    await comment(page, `@${follow.username}`);
    console.log(`@${follow.username} - ${follow.full_name} marcado`);
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    controlComments++;
    if (controlComments > 5) {
      break;
    }
  }

  await browser.close();
  await init();
};

init();