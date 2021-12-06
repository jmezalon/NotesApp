puts "🌱 Seeding data..."

puts "Deleting Users/Notebooks/Notes data..."
User.destroy_all
Notebook.destroy_all
Note.destroy_all


puts "Creating Users"
ben = User.create(first_name: "Ben", last_name: "Jackson")
max = User.create(first_name: "Max", last_name: "Mezalon")


puts "Creating Notebooks"
ntbook1 = Notebook.create(title: "Ben's work", user_id: ben.id)
ntbook2 = Notebook.create(title: "Ben's homework", user_id: ben.id)
ntbook3 = Notebook.create(title: "Classwork", user_id: max.id)
ntbook4 = Notebook.create(title: "Max's work", user_id: max.id)

puts "Creating Notes"
Note.create(title: "React-Markdown", content: "react-markdown is a React component that converts Markdown text into the corresponding HTML code. It is built on remark, which is a Markdown preprocessor.", notebook_id: ntbook1.id, favorite: false)

Note.create(title: "Example", content: "Now, thanks to the remark-gfm plugin, the output will be “React-Markdown now supports ~~strikethrough~~.”", notebook_id: ntbook1.id, favorite: false)

Note.create(title: "Ruby Notes", content: "LogRocket is like a DVR for web apps, recording literally everything that happens on your React app. Instead of guessing why problems happen, you can aggregate and report on what state your application was in when an issue occurred. LogRocket also monitors your app's performance, reporting with metrics like client CPU load, client memory usage, and more.", notebook_id: ntbook2.id, favorite: false)

Note.create(title: "Language Control", content: "Markdown language was designed to help you create editorial content easily. That’s why it only includes basic tags. react-markdown does not support HTML by default and therefore prevents script injections. This makes it safe to use.", notebook_id: ntbook2.id, favorite: false)

Note.create(title: "Ruby Notes", content: "react-markdown is a React component that converts Markdown text into the corresponding HTML code. It is built on remark, which is a Markdown preprocessor.", notebook_id: ntbook3.id, favorite: false)

Note.create(title: "A simple example", content: "Since the react-markdown library provides a component, we need to place our Markdown text as children in it. This will then return the converted HTML code.", notebook_id: ntbook3.id, favorite: false)

Note.create(title: "First Demo", content: "If you want to support the strikethrough feature, for example, you’ll need to use remark-gfm. Let’s create a quick demo to show how this works.", notebook_id: ntbook4.id, favorite: false)

Note.create(title: "Math Stuff", content: "If you want to support mathematical expressions (such as written formulas, equations, fractions, etc.) or KaTeX, a popular math typesetting library, you might consider using remark-math and rehype-katex. These plugins enable you to convert notation in general language into human-readable mathematical formats.", notebook_id: ntbook4.id, favorite: false)


puts "🌱 Done seeding!"