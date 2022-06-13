//获取下拉框的dom对象
var selectObj = document.getElementById("jx");//select对象
var targetUrl = document.getElementById('target-url');//解析输入url框对象
var jsonData;//全局存储json数据
var optionsList = new Array();//用于存储option元素对象
//读取配置文件
window.onload = function () {
            var url = "config.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
            var request = new XMLHttpRequest();
            request.open("get", url);/*设置请求方法与路径*/
            request.send(null);/*不发送数据到服务器*/
            request.onload = function () {/*XHR对象获取到返回信息后执行*/
                if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                    jsonData= JSON.parse(request.responseText);
                    //将配置文件中的数据写到option中添加到select下
                    for(var i = 0;i<jsonData.length;i++){
                        var option = document.createElement('option');
                        optionsList.push(option);
                        selectObj.appendChild(option);
                        option.value = jsonData[i].url;
                        option.innerText = jsonData[i].name;
                        // console.log(jsonData[i].notsupport.length);
                    }
                }
            }
       }


//执行接口调用函数
var jx = function(){
    var url = document.getElementById("target-url").value;
    var index = selectObj.selectedIndex;
    var urljx = selectObj.options[index].value;
    var complete_url = urljx + url;
    var iframe_obj = document.getElementById("playbox");
    iframe_obj.src=complete_url;
}
//绑定事件，我希望隐藏掉不可用的解析接口
//该函数的功能是隐藏不用的接口
function hideInterface(){
    for(var i = 0;i<optionsList.length;i++){
        var bool = new Boolean();
        optionsList[i].style.display = "block";//先设置所有的接口选项可见。
        for(var j = 0;j<jsonData[i].notsupport.length;j++){
            bool = targetUrl.value.includes(jsonData[i].notsupport[j]);
            // console.log(i,j,bool,targetUrl.value);
            if(bool){
                optionsList[i].style.display = "none";
                break;//跳过内层for循环
            }
            
           
        }
       
    }
}