$(document).ready(function(){
    $.getJSON("data.json",function(data){
       $("#try1").append("<ul id='l0'></ul>");
       for(var i=0;i<data.gradesList.length;i++){
            $("#l0").append("<li style='margin-top:3%;'>"+data.gradesList[i].name+"<ul id=l0-"+i+"></ul></li>");
            
            for(var j=0;j<data.gradesList[i].subjectList.length;j++){
                $("#l0-"+i).append("<li style='margin-top:2%;'><i class='fa fa-search'></i>"+data.gradesList[i].subjectList[j].name+"<ul id=l0-"+i+"-"+j+"></ul></li>");
                
                for(var k=0;k<data.gradesList[i].subjectList[j].chapterList.length;k++){
                    $("#l0-"+i+"-"+j).append("<li style='margin-left:15%;margin-top:2px;'>"+data.gradesList[i].subjectList[j].chapterList[k].name+"<ul id=l0-"+i+"-"+j+"-"+k+"></ul></li>");
                    
                    for(var l=0;l<data.gradesList[i].subjectList[j].chapterList[k].questionList.length;l++){
                        var x=l+1;
                        $("#l0-"+i+"-"+j+"-"+k).append("<li>Question "+x+"<p style='display:none'>"+data.gradesList[i].subjectList[j].chapterList[k].questionList[l].question+"<br>"+data.gradesList[i].subjectList[j].chapterList[k].questionList[l].answer+"</p></li>");
                    }   
                }
            }
        }
        $('#try1').jstree({

            "search":{
                "case_sensitive": false,
                "show_only_matches": true,
            },

            "core": {
                "check_callback" : true,
            },
            "plugins" : ["dnd","contextmenu","massload","search","unique","state"]

        });

    });
      
 });
 
$('#try1').on('changed.jstree', function (e, data) {
      var objects = data.instance.get_selected(true)
      var leaves = $.grep(objects, function (o) { return data.instance.is_leaf(o) })
      var list = $('#output')
      list.empty()
      $.each(leaves, function (i, o) {
          var x=o.text;
          var c=0,f=0;
          var str="";
          var offset="";
          var alter=1;
          for(var z=0;z<x.length;z++){
              if(x[z]=='<'){c=1;}
              if(x[z]=='>'){c=0;f=1; continue;}
              if(!c && f==1)str+=x[z];
              if(c==1 && f==1 && str.length!=0){
                if(alter){ offset="Question: ";alter=0;}
                else {offset="Solution: ";alter=1;}
                // $('<div class="container-fluid" style="max-width:100%!important;margin-top:3%;padding-left:5%;"/>').text(offset+str).appendTo(list);
                $(list).append('<div class="container-fluid" style="max-width:100%!important;margin-top:3%;padding-left:5%;">'+'<em style="font-weight:bold;">'+offset+'</em>'+str+'</div>');
                str="";
              }
          }
      })
    });
    
    function nodesearch(){
        $(document).ready(function(){
            var key = document.getElementById("search").value;

            $("#nodesearch").click(function(){

                $("#try1").jstree("search",key);

            });
        });
    }