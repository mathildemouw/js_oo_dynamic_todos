$(document).ready(function() {

  var todoTemplate = $.trim($('#todo_template').html());

  $('.add').on('click', function(){
    event.preventDefault();
    $.ajax({
      type:'POST',
      url: '/todo',
      dataType: 'JSON',
      data: $('#form_add_todo').serialize(),
    }).done(function(response){
        myTodo = new Todo(response);
        console.log(myTodo);
        myTodo.add();
      }).fail(function() {
        console.log("not working");
    });
  });

////////////////
  function Todo (json_data) {
    this.name = json_data.todo_content;
    this.id = json_data.id;
    this.completed = false;
  }

  Todo.prototype = {
    add: function () {
      var toAdd = buildTodo(this);
      this.element = $('.todo_list').append(toAdd);
      this.completability();
      this.removeability();
    },

    completability: function(){
      this.completed = true;
      completeTodo(this);
    },

    removeability: function(){
      removeTodo(this);
    },
  }

////////////////

  function buildTodo(todo) {
    var $todo = $(todoTemplate);
    $todo.find('h2').text(todo.name);
    $todo.find('a.complete').attr('id', todo.id);
    $todo.find('a.delete').attr('id', todo.id);
    return $todo;
  }

  function completeTodo (todo) {
      $('.complete').on('click', function(){
        event.preventDefault();
        $.ajax({
          type:'POST',
          url: '/todo/complete',
          data: {id:todo.id},
        }).done(function(){
          $('.todo').addClass('complete');
        }).fail(function(){
          console.log("complete task not working");
        });
      });
  }

  function removeTodo (todo) {
    $('.delete').on('click', function(){
      event.preventDefault();
      $.ajax({
        type:'POST',
        url: '/todo/delete',
        data: {id:todo.id},
      }).done(function(){
        console.log(this);
        $("#"+todo.id).parent().parent().parent().remove();
        console.log("success!");
      }).fail(function(){
        console.log("complete task not working");
      });
    });
  }

  // function bindEvents() {}


  // bindEvents();
});
