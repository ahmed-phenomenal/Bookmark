//valid
var urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

//pop Up
var popup = document.getElementById("popup")
//inputs
var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var demo = document.getElementById("demo")
//button
var submit = document.getElementById("submit")
//array
var list;
//function
if(localStorage.getItem('list') == null){
    list = []
}
else{
    list = JSON.parse(localStorage.getItem('list'))
    display()
}
submit.onclick = function(){
    console.log(siteName.value)
    console.log(siteUrl.value)
    siteobj = {
        site_Name :siteName.value,
        site_url:siteUrl.value
    }
    list.push(siteobj)
    console.log(list)
    localStorage.setItem('list',JSON.stringify(list))
    display()
    if(urlPattern.test(siteUrl.value) && ((siteName.value).length > 3)){
        console.log("matches")
    }
    else{
        deletefun()
        console.log("not match")
        openPopup()
    }
        siteName.value=siteUrl.value = null
}

function display(){
    var box = ''
    for(var i = 0;i<list.length;i++){
        box += `                <tr>
        <td>${i + 1}</td>
        <td>${list[i].site_Name}</td>
        <td><button class="visit"><a href="${list[i].site_url}" target="_blank"><i class="fa-solid fa-eye"></i>Visit</a></button></td>
        <td><button class="delete" onclick="deletefun(${i})"><a href=""><i class="fa-solid fa-trash"></i>Delete</a></button></td>
    </tr>`
    }
    demo.innerHTML = box
}

function deletefun(index){
    console.log(index)
    list.splice(index,1)
    localStorage.setItem('list',JSON.stringify(list))
    display()
}

function openPopup(){
    popup.classList.add("open-popup")
}
function closePopUp(){
    popup.classList.remove("open-popup")
}
