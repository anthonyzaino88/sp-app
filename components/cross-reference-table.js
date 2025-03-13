const table = document.querySelector('#myTable');
const dropdown = document.querySelector('#inputroot');
const input = document.querySelector('#myInput');
let data = [];
let competitorSorted = true;
let sortColumn = 'CompetitorModel';
let sortBySeries = false;

fetch('../data/cross-references.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    data.sort((a, b) => a[sortColumn].localeCompare(b[sortColumn]));
    table.querySelector('tbody').innerHTML = renderTableRows(data);
    rows = Array.from(table.querySelectorAll('tbody tr'));
    updateNoResultsRow();
  })
  .catch(error => console.error(error));

fetch('../data/competitors.json')
  .then(response => response.json())
  .then(data => {
    dropdown.appendChild(createOption('--Select-All--'));
    data.forEach(item => dropdown.appendChild(createOption(item.CompetitorID)));
  })
  .catch(error => console.error(error));

dropdown.addEventListener('change', filterTable);
input.addEventListener('input', searchTable); // changed event to input

function createOption(value) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = value;
  return option;
}

function renderTableRows(data) {
  return data.map(({ CompetitorModel, CompetitorID, Series, Description, Image, Link }) => `
    <tr data-href="${Link}">
      <td>${CompetitorModel}</td>
      <td>${CompetitorID}</td>
      <td>${Series ? Series : ''}</td>
      <td>${Description}</td>
      <td><img class="table-img" src="${Image}" alt=""></td>
    </tr>
  `).join('');
}

function filterTable() {
  const value = dropdown.value;
  let rowsArray = Array.from(rows);
  const allRowsDisplayed = rowsArray.every(row => row.style.display !== 'none');

  if (value === '--Select-All--' && allRowsDisplayed) {
    dropdown.value = '';
  }

  if (rows && rowsArray) {
    rowsArray.forEach(row => {
      const competitorIdCell = row.cells[1];
      if (competitorIdCell && (value === '--Select-All--' || competitorIdCell.textContent === value)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  } else {
    for (let i = 0; i < rows.length; i++) {
      const competitorIdCell = rows[i].cells[1];
      if (competitorIdCell && (value === '--Select-All--' || competitorIdCell.textContent === value)) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }

  updateNoResultsRow();

  if (value !== '') {
    const tableWrapper = document.querySelector('.table-wrapper');
    tableWrapper.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


function searchTable() {
  const value = input.value.toUpperCase();
  let numResults = 0;
  const selectedCompetitor = dropdown.value;

  // Filter rows based on search criteria
  rows.forEach(row => {
    const text = row.textContent.toUpperCase();
    if (text.includes(value)) {
      if (selectedCompetitor === '--Select-All--' || row.cells[1].textContent === selectedCompetitor) {
        row.style.display = '';
        numResults++;
      } else {
        row.style.display = 'none';
      }
    } else {
      row.style.display = 'none';
    }
  });
  // Update dropdown to show '--Select-All--' option if all rows are visible
  if (numResults === rows.length) {
    dropdown.value = '--Select-All--';
  }

  updateNoResultsRow(numResults);
}


function updateNoResultsRow(numResults = -1) {
  const noResultsRow = document.querySelector('#no-results-row');
  if (!noResultsRow) {
    const tbody = table.querySelector('tbody');
    const numCols = table.querySelector('thead tr').childElementCount;
    tbody.insertAdjacentHTML('beforeend', `
      <tr id="no-results-row">
        <td colspan="${numCols}">No products available</td>
      </tr>
    `);
  }
  const visibleRows = table.querySelectorAll('tbody tr:not([style*="display: none"])');
  if (numResults === -1) {
    numResults = visibleRows.length;
  }
  if (noResultsRow) {
    noResultsRow.style.display = (numResults === 0) ? '' : 'none';
  }
}

table.addEventListener('click', event => {
  const target = event.target.closest('tr');
  if (target) {
    const href = target.getAttribute('data-href');
    if (href) {
      window.location.href = href; // Navigate in the same window
     // window.open(href, '_blank'); Open in a new tab
    }
  }
});


window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const tableWrapper = document.querySelector('.table-wrapper');
  
  // Check if the user has scrolled past the table header
  if (window.scrollY > tableWrapper.offsetTop) {
      header.classList.add('sticky'); // Add the 'sticky' class to make it sticky
  } else {
      header.classList.remove('sticky'); // Remove the 'sticky' class to unstick it
  }
});
