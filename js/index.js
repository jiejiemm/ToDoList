/**
 * Created by WX on 2018/8/9.
 */
//��ʾ���ع����ռ�
function displayDate(nowDate){
    var year=nowDate.getFullYear();
    var month=nowDate.getMonth()+1;
    month=month<10?"0"+month:month;
    var day=nowDate.getDate();
    day=day<10?"0"+day:day;
    return year+"-"+month+"-"+day;
}
function displayCreateDate(creatDate){
    var year=creatDate.getFullYear();
    var month=creatDate.getMonth()+1;
    month=month<10?"0"+month:month;
    var day=creatDate.getDate();
    day=day<10?"0"+day:day;
    var hour=creatDate.getHours();
    hour=hour<10?"0"+hour:hour;
    var minutes=creatDate.getMinutes();
    minutes=minutes<10?"0"+minutes:minutes;
    var seconds=creatDate.getSeconds();
    seconds=seconds<10?"0"+seconds:seconds;
    return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
}

//�������rank-link���a��ǩ��������������������¼�Ĳ˵���ʾ
function display_addlist(idstr) {
    addid = idstr.attr('id');
    //alert($("#" + addid).is(":visible"));
    //if ($("#" + addid).is(":visible")) {
    //    $(document).one("click", function () {
    //        $("#" + addid).css('display', 'none');
    //    });
    //    $("#" + addid).on("click",function(e){
    //            e.stopPropagation();
    //        });
    //    }

    $("#"+addid).show();
        //alert(document.getElementById(addid).style.display);
    //}
}

$(function(){
    $(".addlist").css('display','none');
    var storage=window.localStorage;
    var data=JSON.parse(storage.getItem("data"));
    for(var i in data){
        if(data[i]["planIndex"]==1){
            var $li=$("<li><span class='span_Text'>"+data[i]["planText"]+"</span><span class='span_Time'>"+data[i]["planTime"]+"</span></li>");
            $("#ul-list-wrap-1 ul").prepend($li);
        }
        else if(data[i]["planIndex"]==2){
            var $li=$("<li><span class='span_Text'>"+data[i]["planText"]+"</span><span class='span_Time'>"+data[i]["planTime"]+"</span></li>");
            $("#ul-list-wrap-2 ul").prepend($li);
        }
        else if(data[i]["planIndex"]==3){
            var $li=$("<li><span class='span_Text'>"+data[i]["planText"]+"</span><span class='span_Time'>"+data[i]["planTime"]+"</span></li>");
            $("#ul-list-wrap-3 ul").prepend($li);
        }
        else if(data[i]["planIndex"]==4){
            var $li=$("<li><span class='span_Text'>"+data[i]["planText"]+"</span><span class='span_Time'>"+data[i]["planTime"]+"</span></li>");
            $("#ul-list-wrap-4 ul").prepend($li);
        }
    }
    $(".left-menu .HeadPortrait").click(function(e){
        e.stopPropagation();
        $(".workplace").toggle().removeClass("hidden");
        if($(".workplace").is(":visible")){
            $(document).one("click",function(){
                $(".workplace").hide();
            });
            $(".workplace").on("click",function(e){
                e.stopPropagation();
            });
        }
    });
//titleģ�鹦��
//������ʾ
    var nowDate = new Date();
    $("#display-date").text(displayDate(nowDate));
//���<�ţ�������ǰһ��
    $("#preday").on("click",function(){
        nowDate.setDate(nowDate.getDate()-1);
        $("#display-date").text(displayDate(nowDate));
        if(displayDate(nowDate)!=currentday){
            $("#today").removeClass("active");
        }else{
            $("#today").addClass("active");
        }
    });
//���>�ţ���������һ��
    $("#aftday").on("click",function(){
        nowDate.setDate(nowDate.getDate()+1);
        $("#display-date").text(displayDate(nowDate));
        if(displayDate(nowDate)!=currentday){
            $("#today").removeClass("active");
        }
        else{
            $("#today").addClass("active");
        }
    });

    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});

//���ҳ�������ط����õ�ǰ��ʾ��addlist��div����
//
//    var arrlist=$(".addlist");
//    for(var i=0;i<arrlist.length;i++){
//        if(arrlist.is(":visible")){
//            $(document).on("click",function(){     //����ɼ���Ϊdocumnet����󶨸�һ���Եĵ����¼�
//                arrlist[i].style.display="none";
//            });
//        }
//
//    }

//����������������ݺ󣬰��س��������ݴ浽localstorage��box������һ������¼��¼
    $(".inp").keydown(function() {//�������󶨰����¼�
        if(event.keyCode == "13") {//�ж�������µ��ǻس�����ִ������Ĵ���
            if($(".inp").val().length==0){
                $(this).parent().parent().hide();
            }
            else{
                if(!window.localStorage){
                    alert("�������֧��localstorage");
                }
                else{
                    var creatDate=new Date();
                    var id=$(this).parent().parent().attr('id');
                    var index;
                    if(id=="addlist-1"){
                        index=1;
                    }else if(id=="addlist-2"){
                        index=2;
                    }else if(id=="addlist-3"){
                        index=3;
                    }else if(id=="addlist-4"){
                        index=4;
                    }
                    $(this).parent().parent().hide();
                    var storage=window.localStorage;
                    var dataElement={
                        planText:$(".inp").val(),
                        planTime:displayCreateDate(creatDate),
                        planIndex:index
                    };//��ǰҪ������һ������¼����
                    if(storage.getItem("data") == null){
                        var data = [];
                    }
                    else{
                        var data = JSON.parse(storage.getItem("data"));
                    }//ȡ���Ѵ洢�ı���¼���ݲ�ת��Ϊjson���飬�統ǰ�����κα���¼���ݣ����½�һ��json����
                    data.push(dataElement);//��Ҫ�����ı���¼���ݴ���json����
                    var d = JSON.stringify(data);//��json����תΪ�ַ�������ΪlocalStroageֻ���ַ���
                    storage.setItem("data",d);
                    var $li=$("<li><span class='span_Text'>"+dataElement["planText"]+"</span><span class='span_Time'>"+dataElement["planTime"]+"</span></li>");

                    if(dataElement["planIndex"]==1){
                        $("#ul-list-wrap-1 ul").prepend($li);
                    }
                    else if(dataElement["planIndex"]==2){
                        $("#ul-list-wrap-2 ul").prepend($li);
                    }
                    else if(dataElement["planIndex"]==3){
                        $("#ul-list-wrap-3 ul").prepend($li);
                    }
                    else if(dataElement["planIndex"]==4){
                        $("#ul-list-wrap-4 ul").prepend($li);
                    }
                    $(".inp").val("");
                }
            }

        }
    });

});




