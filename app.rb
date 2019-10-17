require 'bundler/setup'
Bundler.require

require 'open-uri'
require 'erb'
require 'time'
require 'json'

UNITS = 'imperial'
# pass ENV['API_KEY'] when running `ruby app.rb` command
# e.g. `API_KEY=12345 LAT=678 LON=890 ruby app.rb`
weather_url = "http://api.openweathermap.org/data/2.5/weather?lat=#{ENV['LAT']}&lon=#{ENV['LON']}&units=#{UNITS}&APPID=#{ENV['API_KEY']}"
forecast_url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=#{ENV['LAT']}&lon=#{ENV['LON']}&cnt=1&mode=json&units=#{UNITS}&APPID=#{ENV['API_KEY']}"

get '/' do
  @now = Time.now
  tries = 0
  begin
    tries += 1
    weather_json = open(weather_url).read
    forecast_json = open(forecast_url).read
  rescue
    # sometimes the api returns bad data :-/
    sleep 5

    #retry unless tries > 60 # 5 minutes
    retry unless tries > 2
  end

  @weather = JSON.parse(weather_json)
  @forecast = JSON.parse(forecast_json)
  @sunrise = Time.at(@weather['sys']['sunrise'])
  @sunset = Time.at(@weather['sys']['sunset'])
  erb :home
end


