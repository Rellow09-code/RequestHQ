//Defining useful html elements
const home_element = document.getElementById('home');
const nofitication_element = document.getElementById('notifications');
const message_element = document.getElementById('message');
const post_add_element = document.getElementById('post_add');
const menu_element = document.getElementById('post_add');
const refresh_element = document.getElementById('refresh');
//sub elements
const cancel_post = document.getElementById('cancel_post');
const post = document.getElementById('post');
const mySelf = {
    id: '123',
    name: 'Hulisani',
    surname: 'Netshaulu',
    picture: 'https://wallpapers.com/images/hd/best-anime-pictures-3200-x-1800-yszc314pcdgxyala.jpg'
};
const demoCard = {
    user: mySelf,
    title: 'Business Intelligents analysis',
    description: 'Hellow everyone I am Huli\n I hope that everyone is having a good day',
    picture: 'https://s3-alpha.figma.com/hub/file/1389663148/a258a7be-7239-4762-920d-67f7f3f6446e-cover.png'
};
//Defining global variables
const pages = [];
const main = document.getElementById('home_main');
const posting_main = document.getElementById('posting_main');
pages.push(main);
pages.push(posting_main);
//Defining event listeners
home_element === null || home_element === void 0 ? void 0 : home_element.addEventListener('click', () => {
    go_to_home();
});
post_add_element === null || post_add_element === void 0 ? void 0 : post_add_element.addEventListener('click', () => {
    go_to_posting();
});
refresh_element === null || refresh_element === void 0 ? void 0 : refresh_element.addEventListener('click', () => {
    window.location.href = 'app.html';
});
//store the user in memory
const userString = JSON.stringify(mySelf);
localStorage.setItem('user', userString);
function createProfileTab(user) {
    const profile_ui = document.createElement('div');
    profile_ui.className = 'profile_UI';
    const profile_img = document.createElement('img');
    profile_img.src = user.picture;
    profile_ui.appendChild(profile_img);
    const user_names = document.createElement('p');
    profile_ui.appendChild(user_names);
    const bold = document.createElement('b');
    bold.innerHTML = `${user.name} ${user.surname}`;
    user_names.appendChild(bold);
    return profile_ui;
}
function createCardButtons() {
    const card_buttons = document.createElement('section');
    card_buttons.className = 'card_buttons';
    const add_button = document.createElement('i');
    add_button.innerHTML = 'add';
    add_button.className = 'material-icons';
    card_buttons.appendChild(add_button);
    const message_button = document.createElement('i');
    message_button.innerHTML = 'messages';
    message_button.className = 'material-icons';
    card_buttons.appendChild(message_button);
    return card_buttons;
}
function createCardElement(card) {
    const card_element = document.createElement('div');
    card_element.className = 'card';
    //Creating the card header
    const card_header = document.createElement('section');
    card_header.className = 'card_header';
    card_element.appendChild(card_header);
    const profileTab = createProfileTab(card.user);
    card_header.appendChild(profileTab);
    const title = document.createElement('h1');
    card_header.appendChild(title);
    //creating the card body
    const card_body = document.createElement('section');
    card_body.className = 'card_body';
    card_element.appendChild(card_body);
    const paragraph = document.createElement('p');
    paragraph.innerHTML = card.description;
    card_body.appendChild(paragraph);
    const content_img = document.createElement('img');
    content_img.src = card.picture;
    card_body.appendChild(content_img);
    //creating the card buttons
    const card_buttons = createCardButtons();
    card_element.appendChild(card_buttons);
    return card_element;
}
function raisingError(message) {
    console.log(message);
}
function get_user() {
    const userJason = localStorage.getItem('user') || '';
    if (!userJason) {
        raisingError('An error occured, we can\'t recognise you');
        window.location.href = 'Login.html';
    }
    const user = JSON.parse(userJason);
    return user;
}
function create_post() {
    var _a;
    const user = get_user();
    if (!user) {
        return;
    }
    const titleElement = document.getElementById('post_title');
    const pictureElement = document.getElementById('post_picture');
    const textElement = document.getElementById('post_text');
    const title = titleElement === null || titleElement === void 0 ? void 0 : titleElement.value;
    const description = textElement === null || textElement === void 0 ? void 0 : textElement.value;
    const picture = (_a = pictureElement === null || pictureElement === void 0 ? void 0 : pictureElement.files) === null || _a === void 0 ? void 0 : _a[0];
    const post = {
        user,
        title,
        description,
        picture
    };
    createCardElement(post);
}
function init_main() {
    main === null || main === void 0 ? void 0 : main.appendChild(createCardElement(demoCard));
}
function init_posts() {
    (posting_main === null || posting_main === void 0 ? void 0 : posting_main.style) && (posting_main.style.display = 'none');
}
function init() {
    init_main();
    init_posts();
}
function hide_pages() {
    pages.forEach(element => {
        (element === null || element === void 0 ? void 0 : element.style) && (element.style.display = 'none');
    });
}
function go_to_home() {
    hide_pages();
    if (main) {
        main.style.display = 'flex';
    }
}
function go_to_posting() {
    hide_pages();
    if (posting_main) {
        posting_main.style.display = 'flex';
    }
}
init();
export {};
//# sourceMappingURL=app.js.map