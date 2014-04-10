get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/todo' do
  new_todo = Todo.create(todo_content: params[:todo_text])
  new_todo.to_json
end

post '/todo/complete' do
  completed_todo = Todo.find(params[:id])
  completed_todo.update!(completed: true)
end

post '/todo/delete' do
  p params
  Todo.find(params[:id]).destroy!
end