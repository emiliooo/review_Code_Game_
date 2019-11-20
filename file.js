const randomProjectName = ['Project CRM', 'Project IT', 'Project GO', 'Project HOSPITAL', 'Project Insurence', 'Project Logitics', 'Project School', 'Project Inside Company', 'Project Pixels'];
var totalBudget = 2300;
var haveBudget = true;
document.getElementById("budget").innerHTML = totalBudget;
var stateProjectNr = 0;
var own = [];
var backlog = [];
var develops = [];
var testers = [];
var countDeveloper = 1;
var howFastWorking = 5000;

function init() {
   $("#developers").text('Developers: ' + countDeveloper);
   if (countDeveloper > 1) {
      howFastWorking = 1000;
   }
}
init()

function checkStat() {
   if (totalBudget > 2200) {
      $('#newDev').css({
         "display": "block"
      });
      $('#newTester').css({
         "display": "block"
      });
   }
}


function addDev() {
   countDeveloper += 1;
   updateCash('minus', 400);
   init();
}



function buyProject() {
   var min = 1;
   var max = randomProjectName.length;

   var random = Math.floor(Math.random() * (+max - +min)) + +min;

   if (haveBudget) {
      own.push({
         id: random,
         projectName: randomProjectName[random]
      })
      loadListProjectOwner(own);
      updateCash('minus', 300);
   }
}

function loadListProjectOwner(list) {
   $("#owner").empty();
   list.map(item => {
      document.getElementById("owner").innerHTML += '<li id=' + item.id + '>' + item.projectName + '</li>'
   })
}

function updateCash(stat, cash) {
   if (this.totalBudget > 0) {
      if (stat === 'plus') {
         this.totalBudget += cash;
         document.getElementById("budget").innerHTML = totalBudget;
      }
      if (stat === 'minus') {
         if (this.totalBudget > 0) {
            this.totalBudget -= cash;
            document.getElementById("budget").innerHTML = totalBudget;
         } else {
            haveBudget = false;
            alert('You dont have cash')
         }
      }
   } else {
      haveBudget = false;
      alert('You dont have cash')
   }
   checkStat();
}

function toRemoveElement(arrayList, id, nameFunctionList) {
   arrayList.splice(arrayList.findIndex(e => e.id === id), 1);
   nameFunctionList(arrayList);
}

function startProject() {
   var activeProject = $('.active').text();
   var activeProjectID = $('.active').attr('id');

   if (activeProjectID !== undefined) {
      backlog.push({
         id: activeProjectID,
         projectName: activeProject
      })
      toRemoveElement(own, activeProjectID, loadListProjectOwner);
   } else {
      alert('zaznacz projekt owner');
   }

   setTimeout(function () {
      loadListBackLog(backlog);
   }, howFastWorking);
}


function owner() {
   var activeProjectNameBacklog = $('.backlogActive').text();
   var activeProjectIDBacklog = $('.backlogActive').attr('id');

   if (activeProjectIDBacklog !== undefined) {
      develops.push({
         id: activeProjectIDBacklog,
         projectName: activeProjectNameBacklog
      })
      toRemoveElement(backlog, activeProjectIDBacklog, loadListBackLog);
   } else {
      alert('Nie wybrano projektu developers');
   }

   setTimeout(function () {
      loadListBackLog(backlog);
      loadListDevelops(develops);
      loadListProjectOwner(own);
   }, howFastWorking);
}

function developers() {
   var activeProjectNameDevelop = $('.developActive').text();
   var activeProjectIDDevelop = $('.developActive').attr('id');

   if (activeProjectIDDevelop !== undefined) {
      testers.push({
         id: activeProjectIDDevelop,
         projectName: activeProjectNameDevelop
      })
      toRemoveElement(develops, activeProjectIDDevelop, loadListDevelops);
   } else {
      alert('Nie wybrano projektu developers');
   }

   setTimeout(function () {
      loadListTesters(testers);
      loadListProjectOwner(own);
   }, howFastWorking);
}

function tester() {
   var activeProjectNameDevelop = $('.testerActive').text();
   var activeProjectIDDevelop = $('.testerActive').attr('id');

   if (activeProjectIDDevelop !== undefined) {
      testers.push({
         id: activeProjectIDDevelop,
         projectName: activeProjectNameDevelop
      })
      toRemoveElement(develops, activeProjectIDDevelop, loadListDevelops);

      setTimeout(function () {
         updateCash('plus', 400);
         alert('you earn money 400 $ !!');
         testers = [];
         loadListTesters(testers);
      }, howFastWorking);

   } else {
      alert('Nie wybrano projektu testers');
   }

   setTimeout(function () {
      loadListTesters(testers);

   }, 1000);

}

function loadListBackLog(lists) {
   $("#backlog").empty();
   lists.map(item => {
      document.getElementById("backlog").innerHTML += '<li id=' + item.id + '>' + item.projectName + '</li>'
   })
}

function loadListDevelops(list) {
   $("#developer").empty();
   list.map(item => {
      document.getElementById("developer").innerHTML += '<li id=' + item.id + '>' + item.projectName + '</li>'
   })
}

function loadListTesters(list) {
   $("#tester").empty();
   list.map(item => {
      document.getElementById("tester").innerHTML += '<li id=' + item.id + '>' + item.projectName + '</li>'
   })
}


$(document).on('click', '#owner li', function () {
   $(this).siblings().removeClass('active');
   $(this).addClass('active')
})

$(document).on('click', '#backlog li', function () {
   $(this).siblings().removeClass('backlogActive');
   $(this).addClass('backlogActive')
})

$(document).on('click', '#developer li', function () {
   $(this).siblings().removeClass('developActive');
   $(this).addClass('developActive')
})

$(document).on('click', '#tester li', function () {
   $(this).siblings().removeClass('testerActive');
   $(this).addClass('testerActive')
})