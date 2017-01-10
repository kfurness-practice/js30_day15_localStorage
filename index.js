const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const deleteAll = document.querySelector('button[name="deleteAll"]');
const checkAll = document.querySelector('button[name="checkAll"]');
const uncheckAll = document.querySelector('button[name="uncheckAll"]');

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  }

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function toggleDone(e) {
  if(!e.target.matches('input')) return; //skip this unliss it's an input
  const el = e.target;
  const index = el.dataset.index
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList)
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function deleteAllItems(e) {
  items.splice(0, items.length);
  itemsList.innerHTML = '';
}

const checkAllItems = (e) => {
  items.map( (item, i) => {
    const elCheck = itemsList.querySelectorAll('input');
    if (item.done) return;
    item.done = !items.done;
    elCheck[i].checked = true;
  });
}

addItems .addEventListener('submit', addItem);

populateList(items, itemsList);

itemsList.addEventListener('click', toggleDone);
deleteAll.addEventListener('click', deleteAllItems);
checkAll.addEventListener('click', checkAllItems);
