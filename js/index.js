/**
 * Created by WX on 2018/8/9.
 */
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

function addToDoList(inpId){
    var $inp=$("#"+inpId);
    if($inp.val().trim().length==0){
        alert("请输入内容！");
    }
    else{
        if(!window.localStorage){
            alert("浏览器不支持localstorage");
        }
        else{
            var creatDate=new Date();
            var id=$inp.parent().parent().attr('id');
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
                planText:$inp.val(),
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
            $inp.val("");
        }
    }
}

$(function(){
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
        var $wp=$(".workplace");
        $wp.toggle().removeClass("hidden");
        if($wp.is(":visible")){
            $(document).one("click",function(){
                $wp.hide();
            });
            $wp.on("click",function(e){
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

//点击rank-link显示兄弟节点addlist，点击页面其他地方让当前显示的addlist的div隐藏
    $(".rank-link").click(function(e){
        e.stopPropagation();
        var $next=$(this).next("div.addlist");
        var $nextchild=$(this).next("div.addlist").children().children("em");
        //alert($nextchild.attr('class'));
        $($nextchild).click(function(){
            var inpId=$(this).siblings("input").attr('id');
            //alert(inpId);
            addToDoList(inpId);
            $(this).parent().parent().hide();
        });
        $("div.addlist").hide();
        $next.toggle().removeClass("hidden");

        if($next.is(":visible")){
            $(document).click(function(e){
                $next.hide();
            });
            $next.click(function(e){
                e.stopPropagation();
            });
        }
    });

//在输入框中输入内容后，按回车键，数据存到localstorage，box中新增一条备忘录记录
//    $(".inp").keydown(function() {//给输入框绑定按键事件

        //if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
        //    var focusInput=$("input:focus");
        //    alert(focusInput.attr('class'));
        //}
    //$(document).click(function(e){
    //    alert("1");
    //    $(e.target).attr('class');
    //    //var tg=event.target();
    //    //alert(tg.attr('class'));
    //    //var inpId=$(this).prev().attr('id');
    //    //alert(inpId);
    //    //addToDoList(inpId);
    //});
    //});

});




