const mySelf = {
    id: '123',
    name: 'Hulisani',
    surname: 'Netshaulu',
    picture: 'https://wallpapers.com/images/hd/best-anime-pictures-3200-x-1800-yszc314pcdgxyala.jpg'
};
const demoCard = {
    user: mySelf,
    title: 'Business Intelligents analysis',
    description: 'Hellow everyone I am Mia\n I hope that everyone is having a good day',
    picture: 'https://s3-alpha.figma.com/hub/file/1389663148/a258a7be-7239-4762-920d-67f7f3f6446e-cover.png'
};
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
function createCard(card) {
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
const main = document.querySelector('main');
main === null || main === void 0 ? void 0 : main.appendChild(createCard(demoCard));
export {};
//# sourceMappingURL=app.js.map