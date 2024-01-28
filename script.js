async function loadPageData() {
    const response = await fetch("/config.json")
    const json = await response.json()

    loadBlogs(json.blogs)
    loadProjects(json.projects)
    loadWorkExperience(json.work_experience)
    loadEducation(json.education)

    document.getElementById("profile-desc-blogs").innerHTML = json.desc.blogs
    document.getElementById("profile-desc-projects").innerHTML = json.desc.projects
    document.getElementById("profile-desc-work-exp").innerHTML = json.desc.work_exp
    document.getElementById("profile-desc-main").innerHTML = json.desc.main
}

function loadBlogs(blogs) {
    const ul = document.getElementById("profile-blogs-list")
    blogs.forEach(blog => {
        const li = document.createElement("li")
        li.innerHTML = getBlogTemplate(blog.title, blog.url)
        ul.appendChild(li)
    })
}

function loadEducation( education ) {
    let divHtml = ''
    for (i = 0; i < education.length; i++) {
        divHtml += getEducationtemplate(
            education[i].school,
            education[i].desc,
            education[i].course,
            education[i].duration)
    }
    document.getElementById("profile-education").innerHTML = divHtml
}

function loadProjects(projects) {
    let divHtml = ''
    for (i = 0; i < projects.length; i++) {
        divHtml += `
        <div class="col">
        ${getProjectTemplate(
            projects[i].name,
            projects[i].sub,
            projects[i].desc,
            projects[i].github)}
        </div>`
    }
    document.getElementById("profile-projects").innerHTML = divHtml
}

function loadWorkExperience(work_experience) {
    let divHtml = ''
    for (i = 0; i < work_experience.length; i++) {
        divHtml += getWorkExperienceTemplate(
            work_experience[i].designation,
            work_experience[i].duration,
            work_experience[i].desc , 
            work_experience[i].org
        )
    }
    console.log(divHtml)
    document.getElementById("profile-work-experience").innerHTML = divHtml
}

function getEducationtemplate(
    edu_school_name , 
    edu_desc , 
    edu_course , 
    edu_duration
) {
    return `
    <div class="row justify-content-center my-2">
            <div class="card" style="width:75%; height:100%;">
                <div class="card-body">
                    <h5 class="card-title">${edu_course}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${edu_school_name}</h5>
                    <p class="card-text">${edu_desc}</p>
                    <p class="card-text"><small class="text-body-secondary">${edu_duration}</small></p>
                </div>  
            </div>
   </div>`
}

function getWorkExperienceTemplate(
    exp_designation,
    exp_duration,
    exp_description,
    exp_org
) {
    return `
    <div class="row justify-content-center my-2">
            <div class="card" style="width:75%; height:100%;">
                <div class="card-body">
                    <h5 class="card-title">${exp_designation}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${exp_org}</h5>
                    <p class="card-text">${exp_description}</p>
                    <p class="card-text"><small class="text-body-secondary">${exp_duration}</small></p>
                </div>  
            </div>
   </div>`
}

function getProjectTemplate(
    project_name,
    project_subtitle,
    project_description,
    project_github_url,
) {
    return `<div class="card shadow-sm border-light rounded hoverable-card" style="width:100%; height:100%;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${project_name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${project_subtitle}</h5>
                        <p class="card-text">${project_description}</p>
                        <a href="${project_github_url}" class="mt-auto"><i class="bi bi-github"></i></a>
                    </div>
                </div>`
}

function getBlogTemplate(
    blog_title,
    blog_url
) {
    return `<a href="${blog_url}">${blog_title}</a>`
}
