var structure = [
  'Simple root node',
  {
    'text' : 'Root node 2',
    'state' : {
      'opened' : true,
      'selected' : true
    },
    'children' : [
      { 'text' : 'Child 1', 'type':'type1' },
      { 'text' : 'Child 2', 'type':'type2' },
      { 'text' : 'Child 3', 'type':'type3' },
      { 'text' : 'Child 4a', 'type':'type4' },
      { 'text' : 'Child 4b', 'type':'type4' },
    ]
 }
];


var tree = $('#try')
.on('changed.jstree', function(e, data) {
console.log('changed');
refresh_json ();
})
.on('move_node.jstree', function(e, data) {
//console.log('moved');
refresh_json ();
})



.jstree({
"core": {
"check_callback": true,
'data' : structure },
"types" : {
"#" : {"icon" : "glyphicon glyphicon-apple"},
 "default" : {
   "icon" : "glyphicon glyphicon-star"
 },
 "type1" : {
   "icon" : "glyphicon glyphicon-leaf",
   valid_children: ["type2","type3"]
 },
   "type2" : {
   "icon" : "glyphicon glyphicon-heart-empty"
 },
   "type3" : {
   "icon" : "glyphicon glyphicon-flash"
 },
   "type4" : {
   "icon" : "glyphicon glyphicon-tower"
 }  
},  
"plugins": ["contextmenu", "dnd", "types","sort"]
});

//var editor = ace.edit("editor");
//editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

refresh_json ();

function refresh_json ()
{
var v = $("#try").jstree(true).get_json('#', {}, false );
var jsonstring = JSON.stringify(v, null, '\t');
//$("#jsonstring").html("<h1>JSON string</h1><code>" + jsonstring + "</code>");
editor.setValue(jsonstring);
}