class NotesController < ApplicationController


    get '/:notebook_id/notes' do
        notes = Note.where('notebook_id=?', params[:notebook_id])
        notes.to_json
      end
    
      get '/notes/:id' do
        note = Note.find(params[:id])
        note.to_json
      end
    
      post '/:notebook_id/notes' do
        note = Note.create(
          title: params[:title],
          content: params[:content],
          notebook_id: params[:notebook_id],
          favorite: false
        )
        note.to_json
      end
      
      patch '/notes/:id' do
        note = Note.find(params[:id])
        note.update(
          title: params[:title],
          content: params[:content]
        )
        note.to_json
      end
    
      ## for switching notebook
      # patch '/notebook/notes/:id' do
      #   note = Note.find(params[:id])
      #   note.update(notebook_id: params[:notebook_id])
      # end
      # ***************************
    
      delete '/notes/:id' do 
        note = Note.find(params[:id])
        note.destroy
        note.to_json
      end

end