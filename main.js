function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split('; ').reduce((result, c) => {
      const [key, val] = c.split('=').map(decodeURIComponent);
      result[key] = val;
      return result;
    }, {});
    return cookies[name];
  }
  
  function deleteCookie(name) {
    setCookie(name, '', -1);
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('options')) {
      const options = [
        {
          name: 'Pizza',
          description: 'A delicious Italian dish.',
          image_url: 'https://example.com/pizza.png',
        },
        {
          name: 'Sushi',
          description: 'A Japanese dish with vinegared rice and various ingredients.',
          image_url: 'https://example.com/sushi.png',
        },
        {
          name: 'Tacos',
          description: 'A traditional Mexican dish made from corn or wheat tortilla.',
          image_url: 'https://example.com/tacos.png',
        },
      ];
  
      const optionsContainer = document.getElementById('options');
  
      options.forEach((option) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
          <h2>${option.name}</h2>
          <p>${option.description}</p>
          <img src="${option.image_url}" alt="${option.name}" width="100">
          <button>Select</button>
        `;
        optionElement.querySelector('button').addEventListener('click', function () {
          const currentSelections = JSON.parse(getCookie('selection') || '[]');
          currentSelections.push(option);
          setCookie('selection', JSON.stringify(currentSelections), 7);
        });
        optionsContainer.appendChild(optionElement);
      });
    }
  
    if (document.getElementById('selections')) {
      const selectionsContainer = document.getElementById('selections');
      const selections = JSON.parse(getCookie('selection') || '[]');
  
      if (selections.length === 0) {
        selectionsContainer.textContent = 'Please make a selection on the home page.';
      } else {
        selections.forEach((selection, index) => {
          const selectionElement = document.createElement('div');
          selectionElement.innerHTML = `
            <h2>${selection.name}</h2>
            <p>${selection.description}</p>
            <img src="${selection.image_url}" alt="${selection.name}" width="100">
            <button>Delete</button>
          `;
          selectionElement.querySelector('button').addEventListener('click', function () {
            const updatedSelections = JSON.parse(getCookie('selection') || '[]');
            updatedSelections.splice(index, 1);
            setCookie('selection', JSON.stringify(updatedSelections), 7);
            location.reload();
          });
          selectionsContainer.appendChild(selectionElement);
        });
      }
    }
  });
  