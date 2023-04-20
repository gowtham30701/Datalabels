var table = document.createElement('table');
var thead = document.createElement('thead');
var trHeader = document.createElement('tr');
var tbody = document.createElement('tbody');
// var update = document.createElement('button');
// update.innerText = "update"
// update.id = "updateEditValue"
function tableComponent(container, tableProps) {
    table.id = tableProps.id;
    table.className = tableProps.className;
    table.style.width = tableProps.width;

    if (tableProps.headerData)
        headerDataBound(tableProps);

    if (tableProps.tableData) {
        dataBound(tableProps)
    }
    console.log(container);

    if(tableProps.columnFilter){
        var footerRow = document.createElement('tr');
        tableProps.headerData.forEach(function (header) {
            var cell = document.createElement('th');
            cell.textContent = header;
            footerRow.appendChild(cell);
        });
        table.appendChild(document.createElement('tfoot')).appendChild(footerRow);
    }
    
    // container.appendChild(update)
    container.appendChild(table);



// $(document).ready(function () {
//     if(tableProps.columnFilter){
//         columnFilter();
//     }
   
//     var table = $('#myTable').DataTable({
        // dom: 'Bfrtip',
        // rowId: 'id',
        // hover: true,
        // bSort: tableProps.sorting,
        // bFilter: tableProps.columnFilter,
        // sPaginationType: 'full_numbers',
        // sDom: 'RfrtlipBp',
        // colReorder: tableProps.colReorder,
        // paging: true,
        // buttons: dataExport(tableProps),
        // initComplete: function () {
        //     rowSelected();
        //     rowClickEventTriggered();
        //     addDataFilterHead();
//             var table = this;
//             this.api()
//                 .columns()
//                 .every(function () {
//                     var that = this;
//                     $('input', this.footer()).on('keyup change clear', function () {
//                         if (that.search() !== this.value) {
//                             that.search(this.value).draw();
//                         }
//                     });
//                 });
//         },
//     });
//     // 
//     $("#myTable tfoot input").on( 'keyup change', function () {
//         table
//             .column( $(this).parent().index()+':visible' )
//             .search( this.value )
//             .draw();
//     } );
   
// });


$(document).ready(function() {
    // Setup - add a text input to each footer cell
    
    headerColumnFilter();
    // DataTable
    var table = $('#myTable ').DataTable( {
        colReorder: true,
        // dom: 'Bfrtip',
        rowId: 'id',
        hover: true,
        bSort: tableProps.sorting,
        bFilter: tableProps.columnFilter,
        // sPaginationType: 'full_numbers',
        sDom: 'Rfrtlip',
        rowReorder:true,
        colReorder: tableProps.colReorder,
        // paging: true,
        // buttons: dataExport(tableProps),
        dom: 'Bfrtip',
        // rowspan : rowsp
        // rowGroup: {
        //     dataSrc: 1
        // },
        buttons:dataExport(tableProps),
        scrollY:        600,
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   true,
        initComplete: function () {
            this.api()
            .columns()
            .every(function () {
                var that = this;

                $('input', this.footer()).on('keyup change clear', function () {
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });
            rowSelected();
            rowClickEventTriggered();
            // rowDoubleClickEventTriggered(tableProps.tableData)
            // addDataFilterHead();
        }
    } );
    // Apply the filter
   
} );

}

function headerColumnFilter(){
    $('#myTable tfoot th').each( function () {
        var title = $('#myTable  thead th').eq( $(this).index() ).text();
        $(this).html( '<input type="text" class="form-control" placeholder="Search '+title+'" />' );
    } );
}
function dataExport(tableProps) {
    if (tableProps.dataExport) {
        return [
            {
                extend: 'copy',
                text: '<i class="fas fa-clone fa-lg text-primary" ></i>',
                titleAttr: 'Copy'
            },
            {
                extend: 'csv',
                text: '<i class="fas fa-file-csv fa-lg text-success"></i>',
                titleAttr: 'Csv'
            },
            {
                extend: 'excel',
                text: '<i class="fa fa-file-excel fa-lg text-warning"></i>',
                titleAttr: 'Excel'
            },
            {
                extend: 'pdf',
                text: '<i class="fas fa-file-pdf fa-lg text-danger"></i>',
                titleAttr: 'PDF'
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print fa-lg text-warning"></i>',
                titleAttr: 'Print'
            }
        ];
    } else {
        return [];
    }
}


function headerDataBound(tableProps) {
    var data_col_index = 0;
    tableProps.headerData.forEach(function (header) {
        var th = document.createElement('th');
        th.textContent = header;
        trHeader.appendChild(th);
    });
    thead.appendChild(trHeader);
    table.appendChild(thead);
    // console.log("Data is",document.getElementById("name"))
    // console.log("Data",document.getElementById("age"))
    // console.log("Data",document.getElementById("email"))

}

function dataBound(tableProps) {
    for (const row of tableProps.tableData) {
      const tr = document.createElement("tr");
  
      // Create columns for each property in the row
      for (const key in row) {
        const td = document.createElement("td");
        td.classList.add("data");
        td.textContent = row[key];
        tr.appendChild(td);
      }
      const actionsTd = document.createElement("td");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit","btn","btn-primary");
      actionsTd.appendChild(editBtn);
      
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.classList.add("save","btn","btn-success");
      saveBtn.style.display = "none";
      actionsTd.appendChild(saveBtn);
      
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete","btn","btn-danger");
      actionsTd.appendChild(deleteBtn);
      
  
      tr.appendChild(actionsTd);
      tbody.appendChild(tr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
  }
  
 
  
  $(document).on('click', '.edit', function() {
    $(this).parent().siblings('td.data').each(function() {
      var content = $(this).html();
      $(this).html('<input value="' + content + '" class="form-control"/>');
    });
    
    $(this).siblings('.save').show();
    $(this).siblings('.delete').hide();
    $(this).hide();
  });
  
  $(document).on('click', '.save', function() {
    
    $('input').each(function() {
      var content = $(this).val();
      $(this).html(content);
      $(this).contents().unwrap();
    });
    $(this).siblings('.edit').show();
    $(this).siblings('.delete').show();
    $(this).hide();
    
  });
  
  
  $(document).on('click', '.delete', function() {
    $(this).parents('tr').remove();
  });
  
  // Delete row function
  function deleteRow(rowData, rowElement) {
    console.log("Delete row:", rowData);
    // Remove the row element from the table body
    rowElement.parentNode.removeChild(rowElement);
  }
  



// function rowClickEventTriggered(item, tr, tbody, tableData) {
//     //console.log("The event is triggered", item)
//     var clickedRow = event.currentTarget;
//     var rows = Array.from(tbody.querySelectorAll('tr'));
//     var index = rows.indexOf(clickedRow);
//     rows.forEach(function (row) {
//       row.classList.remove('active');
//     });
//     clickedRow.classList.add('active');
//     console.log('The Event is triggered index:', index, ', data is : ', tableData[index]);
//   }


//   var inputs = document.getElementsByTagName('input');
// for (var i = 0; i < inputs.length; i++) {
//   inputs[i].setAttribute('class', 'form-control');
// }


function rowClickEventTriggered() {
    var table = $('#myTable').DataTable();

    $('#myTable tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
    console.log(data);
    ;
    });
}


function rowDoubleClickEventTriggered(tableData) {
    var table = $('#myTable').DataTable();
    var new_values = [];
    // $('#myTable').on('dblclick', 'tr', function() {
    //     $(this).find('td').each(function() {
    //       var cell_value = $(this).text();
    //       $(this).html('<input type="text" value="' + cell_value + '">');
    //     });
    //   });
    // $(document).ready(function() {
        var editing = false;
        // var editedValues = [];
        
          $('#myTable').on('dblclick', 'tr', function() {
            var row_index = $(this).index();
            console.log("Row " + row_index + " has been double-clicked");
            if (editing) {
              return;
            }
        
            editing = true;
        
            
            $(this).find('td').each(function() {
              var cell_value = $(this).text();
              $(this).data('original-value', cell_value);
              $(this).html('<input type="text" value="' + cell_value + '">');
             
            });
            
            
            $(this).find('input').first().focus();
            $('#myTable tr').on('blur', 'input', function() {
                var cell_value = $(this).val();
                var $parent = $(this).parent();
                var old_value = $parent.text();
                if (cell_value !== old_value) {
                  $parent.text(cell_value);
                  //console.log(cell_value);
                }
                new_values.push(cell_value);
                editing = false;
              });
              
            //   console.log( tableData);
            // $('#myTable').on('dblclick', 'tr', function() {
               
            //   });
        //   $('#updateEditValue').on('click', function() {
        //     var cell_value = $(this).val();
        //     $(this).parent().text(cell_value);
        //     console.log(cell_value)
        //     editing = false;
        //   });
        
        //   $('#updateEditValue').on('click', function() {
        //     var row = $(this).closest('tr');
        //     var row_index = row.index();
        //     console.log("row : "+row_index)
        //     var new_data = {};
        
        //     row.find('td').each(function() {
        //       var column_index = $(this).index();
        //       var input_val = $(this).find('input').val();
        //       var cell_val = $(this).data('original-value');
        //       var header_val = tableProps.headerData[column_index];
        
        //       if (input_val && input_val !== cell_val) {
        //         new_data[header_val] = input_val;
        //         console.log(new_data)
        //       } else {
        //         new_data[header_val] = cell_val;
        //         console.log(new_data)
        //       }
        //     });
        
        //     tableProps.tableData[row_index] = new_data;
        //     console.log(new_data)
        //     row.find('td').each(function() {
        //       var cell_value = $(this).find('input').val();
        //       $(this).html(cell_value);
        //       $(this).data('original-value', cell_value);
        //     });
        
        //     editing = false;
        //   });
        // });
        
            });
            console.log(new_values)
}
// function columnFilter(){
//     $('#myTable tfoot th').each( function () {
//         var title = $('#myTable thead th').eq( $(this).index() ).text();
//         $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
//     } );

// }
function rowSelected() {
    $('#myTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
        if ($(this).hasClass('selected')) {
            $(this).css('background-color', 'blue');
            $(this).css('color', 'white');
        } else {
            $(this).css('background-color', '');
            $(this).css('color', '');
        }
    });
}

function addDataFilterHead() {
    var r = $('#myTable tfoot tr');
    r.find('th').each(function () {
        $(this).css('padding', 8);
    });
    $('#myTable thead').append(r);
    $('#search_0').css('text-align', 'center');

    // Initialize column search
    var table = $('#myTable').DataTable();
    table.columns().every(function () {
        var that = this;
        $("#myTable  thead input").on( 'keyup change', function () {
            table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
        } );
    });
}