async function loadPageData() {
    const response = await fetch("/config.json")
    const json = await response.json()

    load_blogs(json.blogs)
    load_projects(json.projects)
    load_work_experience(json.work_experience)
    load_education(json.education)

    document.querySelector("#profile-desc-blogs").innerHTML = json.desc.blogs
    document.querySelector("#profile-desc-projects").innerHTML = json.desc.projects
    document.querySelector("#profile-desc-work-exp").innerHTML = json.desc.work_exp
    document.querySelector("#profile-desc-main").innerHTML = json.desc.main
}

function load_blogs(blogs) {
    const ul = document.querySelector("#profile-blogs-list")
    blogs.forEach(blog => {
        const li = document.createElement("li")
        li.innerHTML = get_blog_template(blog.title, blog.url)
        ul.appendChild(li)
    })
}

function load_education( education ) {
    let divHtml = ''
    education.forEach( (education_element) => {
        divHtml += get_education_template(
            education_element.school,
            education_element.desc,
            education_element.course,
            education_element.duration)
    } )
    document.querySelector("#profile-education").innerHTML = divHtml
}

function load_projects(projects) {
    let divHtml = ''
    projects.forEach( (project_element) => {
        divHtml += `
        <div class="col">
        ${get_project_template(
            project_element.name,
            project_element.sub,
            project_element.desc,
            project_element.github)}
        </div>`
    } )
    document.querySelector("#profile-projects").innerHTML = divHtml
}

function load_work_experience(work_experience) {
    let divHtml = ''
    work_experience.forEach( (work_experience_element) => {
        divHtml += get_work_experience_template(
            work_experience_element.designation,
            work_experience_element.duration,
            work_experience_element.desc , 
            work_experience_element.org
        )
    } )
    document.querySelector("#profile-work-experience").innerHTML = divHtml
}

function get_education_template(
    edu_school_name , 
    edu_desc , 
    edu_course , 
    edu_duration
) {
    return `
    <div class="row justify-content-center my-2">
            <div class="card" style="width:75%; height:100%;">
                <div class="card-body">
                    <h5 class="card-title fs-4">${edu_course}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${edu_school_name}</h5>
                    <p class="card-text">${edu_desc}</p>
                    <p class="card-text"><small class="text-body-secondary">${edu_duration}</small></p>
                </div>  
            </div>
   </div>`
}

function get_work_experience_template(
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

function get_project_template(
    project_name,
    project_subtitle,
    project_description,
    project_github_url,
) {
    return `<div class="card shadow-sm border-light rounded hoverable-card" style="width:100%; height:100%;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fs-4">${project_name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary fs-6"><small>${project_subtitle}</small></h5>
                        <p class="card-text fs-6">${project_description}</p>
                        <a href="${project_github_url}" class="mt-auto"><i class="bi bi-github"></i></a>
                    </div>
                </div>`
}

function get_blog_template(
    blog_title,
    blog_url
) {
    return `<a href="${blog_url}">${blog_title}</a>`
}
