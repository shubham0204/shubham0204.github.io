async function loadPageData() {
    const response = await fetch("/config.json")
    const json = await response.json()

    loadBlogs(json.blogs)
    loadDescription(json.description)
    loadProjects(json.projects)
    loadWorkExperience(json.work_experience)

}

function loadDescription(description) {
    document.getElementById("profile-description")
        .innerHTML = description
}

function loadBlogs(blogs) {
    const ul = document.getElementById("profile-blogs-list")
    blogs.forEach(blog => {
        const li = document.createElement("li")
        li.innerHTML = getBlogTemplate(blog.title, blog.url)
        ul.appendChild(li)
    })
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
            work_experience[i].desc
        )
    }
    console.log(divHtml)
    document.getElementById("profile-work-experience").innerHTML = divHtml
}

function getWorkExperienceTemplate(
    exp_designation,
    exp_duration,
    exp_description
) {
    return `
    <div class="row justify-content-center my-2">
            <div class="card" style="width:75%; height:100%;">
                <div class="card-body">
                    <h5 class="card-title">${exp_designation}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${exp_duration}</h5>
                    <p class="card-text">${exp_description}</p>
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
    return `<div class="card shadow-sm border-light rounded" style="width:100%; height:100%;">
                    <div class="card-body">
                        <h5 class="card-title">${project_name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${project_subtitle}</h5>
                            <p class="card-text">${project_description}</p>
                            <a href="${project_github_url}" class="card-link">GitHub</a>
                    </div>
                </div>`
}

function getBlogTemplate(
    blog_title,
    blog_url
) {
    return `<a href="${blog_url}">${blog_title}</a>`
}