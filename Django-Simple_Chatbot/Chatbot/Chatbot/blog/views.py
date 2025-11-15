from django.shortcuts import render
from django.http import HttpResponse

from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer, ChatterBotCorpusTrainer

bot = ChatBot('chatbot', read_only=False, logic_adapters=[{
                      
                         'import_path':'chatterbot.logic.BestMatch',
                       # 'default_response': 'Sorry, I dont know what that means',
                   }
                   ])
list_to_train = [
    
    "hi", #question
    "hi, there", #answer
    "What's your name?", 
    "I'm just a chatbot",
    "What is your fav food?",
    "I like Pizza",
    "What is your favorite subject?",
    "I love Math and programming",
    "Who is frontman",
    "John Marcel Aleman",
    "Who is the backman",
    "Jhapniel",
    "What is Max's favorite sport?",
    "Chess",
    "I don't know how to code",
    "You will be unemployed",
    "Do you have a family?",
    "I am a chatbot, I do not have a family",
]

chatterbotCorpusTrainer = ChatterBotCorpusTrainer(bot)

#list_trainer = ListTrainer(bot)
#list_trainer.train(list_to_train)
chatterbotCorpusTrainer.train('chatterbot.corpus.english')

def index(request):
    return render(request, 'blog/index.html')

def getResponse(request):
   userMessage = request.GET.get('userMessage')
   chatResponse = str(bot.get_response(userMessage))
   return HttpResponse(chatResponse)
