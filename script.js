var table = document.createElement('table');
var thead = document.createElement('thead');
var trHeader = document.createElement('tr');
var tbody = document.createElement('tbody');
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

var editor;
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
        rowReorder: {
            selector: 'tr',
            update: true
          },
        colReorder: tableProps.colReorder,
        // paging: true,
        // buttons: dataExport(tableProps),
        dom: 'Bfrtip',
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
            // addDataFilterHead();
        }
    } );
    
    // editor = new $.fn.dataTable.Editor( {
    //     table: "#myTable",
    //     fields: [ {
    //             label: "First name:",
    //             name: "name"
    //         }, {
    //             label: "Age:",
    //             name: "age"
    //         }, {
    //             label: "Email:",
    //             name: "email"
    //         },
    //     ]
    // } );

    // $('#myTable').on( 'click', 'tbody td:not(:first-child)', function (e) {
    //     editor.inline( this );
    // } );
 
    // $('#myTable').DataTable( {
    //     dom: "Bfrtip",
    //     ajax: "../php/staff.php",
    //     order: [[ 1, 'asc' ]],
    //     columns: [
    //         {
    //             data: null,
    //             defaultContent: '',
    //             className: 'select-checkbox',
    //             orderable: false
    //         },
    //         { data: "first_name" },
    //         { data: "last_name" },
    //         { data: "position" },
    //         { data: "office" },
    //         { data: "start_date" },
    //         { data: "salary", render: $.fn.dataTable.render.number( ',', '.', 0, '$' ) }
    //     ],
    //     select: {
    //         style:    'os',
    //         selector: 'td:first-child'
    //     },
    //     buttons: [
    //         { extend: "create", editor: editor },
    //         { extend: "edit",   editor: editor },
    //         { extend: "remove", editor: editor }
    //     ]
    // } );
   
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
                text: '<i class="fa fa-copy icon-large"></i>',
                titleAttr: 'Copy'
            },
            {
                extend: 'csv',
                text: '<i class="fa fa-file-csv icon-large"></i>',
                titleAttr: 'Csv'
            },
            {
                extend: 'excel',
                text: '<i class="fa fa-file-excel icon-large"></i>',
                titleAttr: 'Excel'
            },
            {
                extend: 'pdf',
                text: '<i class="fa fa-file-pdf icon-large"></i>',
                titleAttr: 'PDF'
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print icon-large"></i>',
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
        for (const key in row) {
            const td = document.createElement("td");
            td.textContent = row[key];
            tr.appendChild(td);
        } tbody.appendChild(tr);
        //   tr.addEventListener('click', function () {
        //     rowClickEventTriggered(row, tr, tbody, tableProps.tableData);
        //   });
    }
    table.appendChild(thead);
    table.appendChild(tbody);

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



// <button class="btn"><i class="fa fa-home"></i></button>
// <button class="btn"><i class="fa fa-bars"></i></button>
// <button class="btn"><i class="fa fa-trash"></i></button>
// <button class="btn"><i class="fa fa-close"></i></button>
// <button class="btn"><i class="fa fa-folder"></i></button>