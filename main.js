async function loadPageData() {
    const response = await fetch( "/config.json" )
    const json = await response.json()

    loadBlogs( json.blogs )
    loadDescription( json.description )
    loadProjects2( json.projects )

}

function loadDescription( description ) {
    document.getElementById( "profile-description" )
            .innerHTML = description
}

function loadBlogs( blogs ) {
    const ul = document.getElementById( "profile-blogs-list" )
    blogs.forEach(blog => {
        const li = document.createElement( "li" )
        li.innerHTML = getBlogTemplate( blog.title , blog.url )
        ul.appendChild( li )
    })
}

function loadProjects2( projects ) {
    let table_html = ''
    for( i = 0 ; i < projects.length ; i++ ) {
        table_html += `
        <div class="col">
        ${getProjectTemplate( 
            projects[i].name , 
            projects[i].sub , 
            projects[i].desc , 
            projects[i].github , 
            projects[i].blog )}
        </div>`
    }
    console.log( table_html )
    document.getElementById( "profile-projects" ).innerHTML = table_html
}

function getProjectTemplate(
    project_name , 
    project_subtitle , 
    project_description , 
    project_github_url , 
    project_blog_url
) {
    return `<div class="card" style="width:100%; height:100%;">
                    <div class="card-body">
                        <h5 class="card-title">${project_name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${project_subtitle}</h5>
                            <p class="card-text">${project_description}</p>
                            <a href="${project_github_url}" class="card-link">GitHub</a>
                            <a href="${project_blog_url}" class="card-link">Blog</a>
                    </div>
                </div>`
}

function getBlogTemplate(
    blog_title , 
    blog_url
) {
    return `<a href="${blog_url}">${blog_title}</a>`
}