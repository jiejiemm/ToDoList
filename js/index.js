/**
 * Created by WX on 2018/8/9.
 */
//显示隐藏工作空间
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

//点击各个rank-link里的a标签触发方法，将新增备忘录的菜单显示
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
//title模块功能
//日期显示
    var nowDate = new Date();
    $("#display-date").text(displayDate(nowDate));
//点击<号，日期往前一天
    $("#preday").on("click",function(){
        nowDate.setDate(nowDate.getDate()-1);
        $("#display-date").text(displayDate(nowDate));
        if(displayDate(nowDate)!=currentday){
            $("#today").removeClass("active");
        }else{
            $("#today").addClass("active");
        }
    });
//点击>号，日期往后一天
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

//点击页面其他地方，让当前显示的addlist的div隐藏
//
//    var arrlist=$(".addlist");
//    for(var i=0;i<arrlist.length;i++){
//        if(arrlist.is(":visible")){
//            $(document).on("click",function(){     //如果可见就为documnet对象绑定个一次性的单击事件
//                arrlist[i].style.display="none";
//            });
//        }
//
//    }

//在输入框中输入内容后，按回车键，数据存到localstorage，box中新增一条备忘录记录
    $(".inp").keydown(function() {//给输入框绑定按键事件
        if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            if($(".inp").val().length==0){
                $(this).parent().parent().hide();
            }
            else{
                if(!window.localStorage){
                    alert("浏览器不支持localstorage");
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
                    };//当前要新增的一条备忘录数据
                    if(storage.getItem("data") == null){
                        var data = [];
                    }
                    else{
                        var data = JSON.parse(storage.getItem("data"));
                    }//取出已存储的备忘录数据并转换为json数组，如当前还无任何备忘录数据，则新建一个json数组
                    data.push(dataElement);//将要新增的备忘录数据存入json数组
                    var d = JSON.stringify(data);//将json数组转为字符串，因为localStroage只存字符串
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




