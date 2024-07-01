import ButtonManager from '../../../../src/plugins/ButtonManager/ButtonManager.js';

// Delete markers button
const deleteMarkersBtn = new ButtonManager('main', 'button-delete-route', () => {
    console.log('clicked!')
})
deleteMarkersBtn.onClick();

const buttons = {
    deleteMarkersBtn,
};

export default buttons;