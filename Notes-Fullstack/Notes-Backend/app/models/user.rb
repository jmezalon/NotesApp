class User < ActiveRecord::Base 
    has_many :notebooks
end