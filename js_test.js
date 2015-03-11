


    //initialize arrays
var delayedTest = new Array();
var delayedTime = new Array();
    //initialize time variables
var timer_is_on=0;
var t;

    //time interval for data collection in ms
    //var dt=100;
 var dt=100;


function doTimer()
{
 if (!timer_is_on)
 {
  initTime = new Date().getTime();
  timer_is_on=1;
  timedCount();
 }
}

//record the current response on the slider while the audio is playing
function timedCount()
{
  if(window.audio_playing&!audio_done){
   var timeInSec = (new Date().getTime()-initTime) / 1000.;
   delayedTime.push(timeInSec);
   //var currentQuestionID = this.getQuestionInfo().QuestionID
   var responseTextField = document.getElementById(currentQuestionID + '~1~result')
   var currentResponse = responseTextField.value
   //alert("Testing: " + currentResponse + "}")
   //delayedTest.push(currentResponse);
   delayedTest.push(currentResponse);
   }
  t=setTimeout("timedCount()",dt);
}




Qualtrics.SurveyEngine.addOnload(function()
{


  window.audio_playing = 0
  window.audio_done = 0

  //record when the audio plays, pauses, and ends
  document.getElementById('bg_audio').addEventListener('play', function(){
    window.audio_playing = 1;
    window.initTime = new Date().getTime();
   //alert("Testing: " + 1 + "}")
  });

  document.getElementById('bg_audio').addEventListener('pause', function(){
    window.audio_playing = 0;
  });

  document.getElementById('bg_audio').addEventListener('ended', function(){
    window.audio_playing = 0;
    window.audio_done = 1;
  });

    window.currentQuestionID = this.getQuestionInfo().QuestionID
    window.resultEmbeddedName = "result_" + currentQuestionID.substring(3)   //e.g. result_6
    //printstuff(currentQuestionID);



    document.onload = doTimer();
    //t=setTimeout("doTimer()",dt)

    //alert("Testing: " + currentQuestionID + "}")

    $('NextButton').onclick = function (event) {
    
      clearTimeout(t);
          timer_is_on=0;

          Qualtrics.SurveyEngine.setEmbeddedData("time", delayedTime.join());
          Qualtrics.SurveyEngine.setEmbeddedData("testing", delayedTest.join());
    
        // everything in here will run when you click the next button
        // note that it has access to javascript variables from the enclosing function
        // however, if you declare something in here with "var" then it will be a LOCAL variable

        // the following alert will appear when you click the next button. For me, it appears twice;
        // I'm not sure why.

        // Save the current question's response value
        var responseTextField = document.getElementById(currentQuestionID + '~1~result')
        var currentResponse = responseTextField.value
        //alert("Result: " + currentResponse + "\nwill be available to future questions as: \n$" + "{e://Field/" + resultEmbeddedName + "}")
        //alert("ID is : " + currentResponse +"}")

       // Qualtrics.SurveyEngine.setEmbeddedData("testing", currentResponse)
          Qualtrics.SurveyEngine.setEmbeddedData(resultEmbeddedName, currentResponse)

        // and now run the event that the normal next button is supposed to do
        Qualtrics.SurveyEngine.navClick(event, 'NextButton')
    }
});