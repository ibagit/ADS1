/*
Script crawls thru Food Recall Safety application.
Author: James Daly 06/26/2015 /
class NewTest
  def test_foo
    click "link=Food Recall Safety"
    verifyTitle "Food Safety Recall"
    verifyText "link=Home", "Home"
    verifyText "link=About", "About"
    verifyText "link=Contact", "Contact"
    verifyText "css=h1", "Welcome!"
    verifyText "css=p.lead", "Please click on your state below to start searching for recalled items near you."
    verifyText "link=• Learn more about IBA", "• Learn more about IBA"
    verifyText "link=• View current openings at IBA", "• View current openings at IBA"
    verifyText "link=• See IBA's List of satisfied customers", "• See IBA's List of satisfied customers"
    verifyText "css=a.facebook > img"
    verifyText "css=a.twitter > img"
    verifyText "css=a.linkedin > img"
    click "id=jqvmap1_va"
    verifyText "css=h1.text-center", "exact:What type of Food Recall are you looking for?"
    click "link=Food Recall Safety"
    click "id=jqvmap1_fl"
    verifyText "css=h1.text-center", "exact:What type of Food Recall are you looking for?"
    click "link=Food Recall Safety"
    click "id=jqvmap1_ca"
    verifyText "css=h1.text-center", "exact:What type of Food Recall are you looking for?"
    selectWindow "null"
    click "link=food"
    type "css=input[type="text"]", "chicken"
    click "css=button.nl-field-go"
    click "css=button.nl-submit"
    verifyText "//li/div/div/div[2]", "Lean Cuisine Culinary Collection Chicken with Peanut Sauce. Packaged in 9 oz (255g) Plastic Tray in Fiberboard Carton 12 cartons per case by Nestle USA, INC, Solon, OH 44139 USA."
    click "link=Food Recall Safety"
  end
end