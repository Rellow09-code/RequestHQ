//Defining useful html elements
const home_element:HTMLElement|null = document.getElementById('home')
const nofitication_element:HTMLElement|null = document.getElementById('notifications')
const message_element:HTMLElement|null = document.getElementById('message')
const post_add_element:HTMLElement|null = document.getElementById('post_add')
const menu_element:HTMLElement|null = document.getElementById('post_add')
const refresh_element:HTMLElement|null = document.getElementById('refresh')

//sub elements
const cancel_post:HTMLElement|null = document.getElementById('cancel_post')
const post:HTMLElement|null = document.getElementById('post')

//Defining the interfaces and classes
interface User {
    id:string,
    name:string,
    surname:string,
    picture:string
}

interface Card {
    user:User,
    title:string,
    description:string,
    picture:string
}


const mySelf:User = {
    id:'123',
    name:'Hulisani',
    surname:'Netshaulu',
    picture:'https://wallpapers.com/images/hd/best-anime-pictures-3200-x-1800-yszc314pcdgxyala.jpg'
}

const demoCard:Card = {
    user:mySelf,
    title: 'Business Intelligents analysis',
    description : 'Hellow everyone I am Huli\n I hope that everyone is having a good day',
    picture:'https://s3-alpha.figma.com/hub/file/1389663148/a258a7be-7239-4762-920d-67f7f3f6446e-cover.png'
}

//Defining global variables
const pages:Array<HTMLElement|null> = []
const main = document.getElementById('home_main')
const posting_main = document.getElementById('posting_main')


pages.push(main)
pages.push(posting_main)

//Defining event listeners

home_element?.addEventListener('click',()=>{
    go_to_home()
})
post_add_element?.addEventListener('click',()=>{
    go_to_posting()
})
refresh_element?.addEventListener('click',()=>{
    window.location.href = 'app.html'
})

//store the user in memory
const userString:string = JSON.stringify(mySelf)
localStorage.setItem('user',userString)

function createProfileTab(user:User):HTMLDivElement{
    const profile_ui = document.createElement('div')
    profile_ui.className = 'profile_UI'

    const profile_img = document.createElement('img')
    profile_img.src = user.picture
    profile_ui.appendChild(profile_img)

    const user_names = document.createElement('p')
    profile_ui.appendChild(user_names)
    const bold = document.createElement('b')
    bold.innerHTML = `${user.name} ${user.surname}`
    user_names.appendChild(bold)

    return profile_ui
}

function createCardButtons():HTMLElement{
    const card_buttons = document.createElement('section')
    card_buttons.className = 'card_buttons'

    const add_button = document.createElement('i')
    add_button.innerHTML = 'add'
    add_button.className = 'material-icons'
    card_buttons.appendChild(add_button)

    const message_button = document.createElement('i')
    message_button.innerHTML = 'messages'
    message_button.className = 'material-icons'
    card_buttons.appendChild(message_button)

    return card_buttons
}

function createCardElement(card:Card):HTMLDivElement{
    const card_element = document.createElement('div')
    card_element.className = 'card'

    //Creating the card header
    const card_header = document.createElement('section')
    card_header.className = 'card_header'
    card_element.appendChild(card_header)

    const profileTab = createProfileTab(card.user)
    card_header.appendChild(profileTab)

    const title = document.createElement('h1')
    card_header.appendChild(title)

    //creating the card body
    const card_body = document.createElement('section')
    card_body.className = 'card_body'
    card_element.appendChild(card_body)
    
    const paragraph = document.createElement('p')
    paragraph.innerHTML = card.description
    card_body.appendChild(paragraph)
    
    const content_img = document.createElement('img')
    content_img.src = card.picture
    card_body.appendChild(content_img)

    //creating the card buttons
    const card_buttons = createCardButtons()
    card_element.appendChild(card_buttons)

    return card_element
}

function raisingError(message:string){
    console.log(message)
}

function get_user():User{
    const userJason:string|false = localStorage.getItem('user') || ''
    if (!userJason){
        raisingError('An error occured, we can\'t recognise you')
        window.location.href = 'Login.html'
    }

    const user:User = JSON.parse(userJason)
    return user
}

function create_post(){
    const user:User = get_user()
    if (!user){return}

    const titleElement = document.getElementById('post_title') as HTMLInputElement
    const pictureElement = document.getElementById('post_picture') as HTMLInputElement
    const textElement = document.getElementById('post_text') as HTMLTextAreaElement

    const title:string = titleElement?.value
    const description:string = textElement?.value
    const picture:any = pictureElement?.files?.[0]

    const post:Card = {
        user,
        title,
        description,
        picture
    }
    createCardElement(post)
}

function init_main(){
    main?.appendChild(createCardElement(demoCard))
}
function init_posts(){
    posting_main?.style && (posting_main.style.display = 'none')
}

function init(){
    init_main()
    init_posts()
}
function hide_pages(){
    pages.forEach(element => {
        element?.style && (element.style.display = 'none')
    });
}
function go_to_home(){
    hide_pages()
    if (main){
        main.style.display = 'flex'
    }
}
function go_to_posting(){
    hide_pages()
    if (posting_main){
        posting_main.style.display = 'flex'
    }
}
init()