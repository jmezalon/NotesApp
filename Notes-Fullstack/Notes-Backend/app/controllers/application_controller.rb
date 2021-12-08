class ApplicationController < Sinatra::Base
    set default_content_type: "application/json"
    
  # user request  
    
    get '/users' do
      users = User.all  

      users.to_json
    end
  
    post '/users/login' do
      user = User.find_by(name: params[:name])
      # users = User.where('name=?', params[:name]) 
      # user = users.where('name=?', params[:name])
      user.to_json
    end
  
    post '/users/signup' do
      user = User.create(
        name: params[:name],
        email: params[:email],
        password: params[:password]
      )
      user.to_json
    end
  
  
  # notebooks request
  
  
  
  # notes request
  
  end
  