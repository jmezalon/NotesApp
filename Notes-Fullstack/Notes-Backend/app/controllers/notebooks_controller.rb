class NotebooksController < ApplicationController
    get '/:user_id/notebooks' do
        notebooks = Notebook.where('user_id=?', params[:user_id])
        notebooks.to_json
      end
    
      get '/notebooks/:id' do
        notebook = Notebook.find(params[:id])
        notebook.to_json
      end
    
      post '/:user_id/notebooks' do
        notebook = Notebook.create(
          title: params[:title],
          user_id: params[:user_id]
        )
        notebook.to_json
      end
        
      patch '/notebooks/:id' do
        notebook = Notebook.find(params[:id])
        notebook.update(
          title: params[:title]
        )
        notebook.to_json
      end
    
      delete '/notebooks/:id' do 
        notebook = Notebook.find(params[:id])
        notebook.destroy
        notebook.to_json
      end

end