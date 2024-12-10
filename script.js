var sentences = ["A Web Developer", "A SoftWare Developer", "A Data Scientist"];
var index = 0;
var speed = 100;
var deletingSpeed = 50;
var currentSentence = "";
var isDeleting = false;

function type() {
    currentSentence = sentences[index % sentences.length].substring(0, currentSentence.length + 1);
    document.getElementById("aniType").textContent = currentSentence;
    if (currentSentence === sentences[index % sentences.length]) {
        isDeleting = true;
        setTimeout(function() {
            deleteType();
        }, 3000);
    } else {
        setTimeout(function() {
            type();
        }, speed);
    }
}

function deleteType() {
    currentSentence = currentSentence.substring(0, currentSentence.length - 1);
    document.getElementById("aniType").textContent = currentSentence;
    if (currentSentence === "") {
        isDeleting = false;
        index++;
        setTimeout(function() {
            type();
        }, 500);
    } else {
        setTimeout(function() {
            deleteType();
        }, deletingSpeed);
    }
}

type();

async function loadProjects(){
    try{
        const response = await fetch('data/projects.json');
        return await response.json();
    }catch (error){
        alert("Error loading Projects try again")
    }
}

window.onload= async function (){
    const data= await loadProjects();

    console.log(data.projects)
    const projectContainer=document.getElementById("project-list")
    data.projects.forEach((project)=>
    {

        const projectDescription=document.createElement("p")
        projectDescription.textContent = project.description;

        const projectTitle = document.createElement("h3")
        projectTitle.textContent = project.name

        const projectImg = document.createElement("img")
        projectImg.src=project.img

        const projectLinkCard = document.createElement("a")
        projectLinkCard.classList.add("project","project-tile")
        projectLinkCard.href= project.link
        projectLinkCard.target="_blank"
        projectLinkCard.appendChild(projectImg)
        projectLinkCard.appendChild(projectTitle)
        projectLinkCard.appendChild(projectDescription)


        const projectCard= document.createElement("div")
        projectCard.classList.add("card")
        projectCard.appendChild(projectLinkCard)

        const projectItem=document.createElement("li")
        projectItem.appendChild(projectCard)

        projectContainer.appendChild(projectItem)
    })

}