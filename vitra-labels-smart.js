/* VITRA — leitura e identificação assistida de etiquetas (piloto admin).
   Referência: DOC.CQ.056, 12/09/2026, pp. 2–5, 10–33 e 39–42.
   Não presume conformidade visual nem transforma uma leitura OCR em aprovação. */
(function(){
"use strict";
const catalog=[{"barcode":"7898941149994","client":"caco","product":"Uva Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898366000542","client":"docemel","product":"Uva verde sem semente","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898366000429","client":"docemel","product":"Uva vermelha sem semente","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366001754","client":"docemel","product":"Uva Vitória","variety":"vitoria","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898366000481","client":"docemel","product":"Uva Midnight","variety":"midnight","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898366000412","client":"docemel","product":"Uva Benitaka","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366000504","client":"docemel","product":"Uva Red Globe","variety":"redglobe","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366001358","client":"docemel","product":"Cinta Dahora · Vitória","variety":"vitoria","color":"negra","weight":"250","klass":"","kind":"cinta250"},{"barcode":"7898366002898","client":"docemel","product":"Cinta Pick&Nick · uva verde","variety":"","color":"branca","weight":"250","klass":"","kind":"cinta250"},{"barcode":"7898366003604","client":"docemel","product":"Cinta Pick&Nick · uva verde","variety":"","color":"branca","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366003598","client":"docemel","product":"Cinta Pick&Nick · uva vermelha","variety":"","color":"vermelha","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366003611","client":"docemel","product":"Cinta Pick&Nick · Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366000542","client":"trielo","product":"Uva verde sem semente","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898366000429","client":"trielo","product":"Uva vermelha sem semente","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366001754","client":"trielo","product":"Uva Vitória","variety":"vitoria","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898366000481","client":"trielo","product":"Uva Midnight","variety":"midnight","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898366000412","client":"trielo","product":"Uva Benitaka","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366000504","client":"trielo","product":"Uva Red Globe","variety":"redglobe","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366001358","client":"trielo","product":"Cinta Dahora · Vitória","variety":"vitoria","color":"negra","weight":"250","klass":"","kind":"cinta250"},{"barcode":"7898366002898","client":"trielo","product":"Cinta Pick&Nick · uva verde","variety":"","color":"branca","weight":"250","klass":"","kind":"cinta250"},{"barcode":"7898366003604","client":"trielo","product":"Cinta Pick&Nick · uva verde","variety":"","color":"branca","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366003598","client":"trielo","product":"Cinta Pick&Nick · uva vermelha","variety":"","color":"vermelha","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366003611","client":"trielo","product":"Cinta Pick&Nick · Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898906610095","client":"debrand","product":"Uva Thompson","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7898906610217","client":"debrand","product":"Uva Crimson","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898906610149","client":"debrand","product":"Uva Red Globe","variety":"redglobe","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898906610279","client":"debrand","product":"Uva Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7898906610101","client":"debrand","product":"Uva Benitaka","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898906610262","client":"debrand","product":"Uva mista","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"0751320764195","client":"tt","product":"Uva Núbia / Jubilee","variety":"nubia","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"0751320764140","client":"tt","product":"Uva mista","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"0751320764133","client":"tt","product":"Uva Thompson","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"0609963080076","client":"tt","product":"Uva verde","variety":"","color":"branca","weight":"250","klass":"","kind":""},{"barcode":"0751320764102","client":"tt","product":"Uva black sem semente / Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7898954999197","client":"tt","product":"Uva Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"0751320764126","client":"tt","product":"Uva Crimson / Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898923868974","client":"assai","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"assai","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"assai","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868974","client":"paguemenos","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"paguemenos","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"paguemenos","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868974","client":"casaavenida","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"casaavenida","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"casaavenida","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868974","client":"gmap","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"gmap","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"gmap","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868974","client":"condor","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"condor","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"condor","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868172","client":"paguemenos","product":"Uva preta com semente / Sweet Jubilee","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868172","client":"casaavenida","product":"Uva preta com semente / Sweet Jubilee","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868172","client":"gmap","product":"Uva preta com semente / Sweet Jubilee","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868172","client":"condor","product":"Uva preta com semente / Sweet Jubilee","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868325","client":"mambo","product":"Uva preta sem semente","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868301","client":"mambo","product":"Uva clara sem semente / S. Crisp","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868318","client":"mambo","product":"Uva vermelha sem semente / C. Crush","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898746820432","client":"patrulha","product":"Uva preta","variety":"","color":"negra","weight":"250","klass":"","kind":""},{"barcode":"7898746820425","client":"patrulha","product":"Uva branca","variety":"","color":"branca","weight":"250","klass":"","kind":""},{"barcode":"7898746820449","client":"patrulha","product":"Uva vermelha","variety":"","color":"vermelha","weight":"250","klass":"","kind":""},{"barcode":"7898746820395","client":"patrulha","product":"Uva preta","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7898746820371","client":"patrulha","product":"Uva branca","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7898746820456","client":"patrulha","product":"Uva vermelha","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898746820401","client":"patrulha","product":"Uva mista branca/preta","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"7898746820418","client":"patrulha","product":"Uva mista branca/vermelha","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"7898968700079","client":"sangiuseppe","product":"Uva mista","variety":"mista","color":"mista","weight":"","klass":"","kind":""},{"barcode":"7898968700031","client":"sangiuseppe","product":"Uva Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898968700024","client":"sangiuseppe","product":"Uva Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898968700000","client":"sangiuseppe","product":"Uva Vitória","variety":"vitoria","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898968700055","client":"sangiuseppe","product":"Uva Rubi","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898968700086","client":"sangiuseppe","product":"Uva Benitaka","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898968700017","client":"sangiuseppe","product":"Uva Niagara","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898968700048","client":"sangiuseppe","product":"Uva Itália","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898968700062","client":"sangiuseppe","product":"Uva Ísis","variety":"isis","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7895000334674","client":"cia","product":"Qualitá · vermelha sem semente","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898948102077","client":"cia","product":"Qualitá · clara sem semente","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7895000365241","client":"cia","product":"Qualitá · preta sem semente","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7895000356096","client":"cia","product":"Qualitá · mista sem semente","variety":"mista","color":"mista","weight":"","klass":"","kind":""},{"barcode":"7895000356089","client":"cia","product":"Qualitá · Itália","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898901796893","client":"cia","product":"Qualitá · Benitaka","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7895000356102","client":"cia","product":"Qualitá · mista com semente","variety":"mista","color":"mista","weight":"","klass":"","kind":""},{"barcode":"7895000356072","client":"cia","product":"Qualitá · vermelha com semente","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7895000334698","client":"cia","product":"Qualitá · preta com semente","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7891103206894","client":"carrefour","product":"Carrefour Mercado · clara sem semente","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7891103206900","client":"carrefour","product":"Carrefour Mercado · vermelha sem semente","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7891103206924","client":"carrefour","product":"Carrefour Mercado · preta sem semente","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206979","client":"carrefour","product":"Carrefour Mercado · preta especial","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206931","client":"carrefour","product":"Carrefour Mercado · preta com semente","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206917","client":"carrefour","product":"Carrefour Mercado · vermelha com semente","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7891103206870","client":"sq","product":"Carrefour S&Q · clara especial","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7891103206740","client":"sq","product":"Carrefour S&Q · clara sem semente","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7891103206771","client":"sq","product":"Carrefour S&Q · preta sem semente","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206887","client":"sq","product":"Carrefour S&Q · preta especial","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206757","client":"sq","product":"Carrefour S&Q · vermelha sem semente","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7891103206764","client":"sq","product":"Carrefour S&Q · vermelha com semente","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7891103206788","client":"sq","product":"Carrefour S&Q · preta com semente","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103524776","client":"sq","product":"Carrefour S&Q · mista sem semente","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"7891103206849","client":"sq","product":"Carrefour S&Q · clara sem semente","variety":"","color":"branca","weight":"250","klass":"","kind":""},{"barcode":"7891103206863","client":"sq","product":"Carrefour S&Q · preta sem semente","variety":"","color":"negra","weight":"250","klass":"","kind":""},{"barcode":"7891103206856","client":"sq","product":"Carrefour S&Q · vermelha sem semente","variety":"","color":"vermelha","weight":"250","klass":"","kind":""},{"barcode":"7898923868424","client":"expofrut","product":"Algodão Doce","variety":"","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868592","client":"expofrut","product":"Algodão Doce","variety":"","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868127","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868295","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868585","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868639","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868653","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868042","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868578","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868646","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868851","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868875","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868882","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868936","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868066","client":"expofrut","product":"Black Seedless","variety":"","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868912","client":"expofrut","product":"Black Seedless","variety":"","color":"negra","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868455","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868547","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868554","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868561","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868615","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868813","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868950","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868202","client":"expofrut","product":"Clara sem semente","variety":"","color":"branca","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868301","client":"expofrut","product":"Clara sem semente","variety":"","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868974","client":"expofrut","product":"Clara sem semente","variety":"","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868707","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868714","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868721","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868738","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868790","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"Sabor","kind":""},{"barcode":"7898923868806","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868899","client":"expofrut","product":"Itum 9","variety":"itum9","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868905","client":"expofrut","product":"Itum 9","variety":"itum9","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868929","client":"expofrut","product":"Itum 9","variety":"itum9","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868660","client":"expofrut","product":"Melodia","variety":"melodia","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868677","client":"expofrut","product":"Melodia","variety":"melodia","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868684","client":"expofrut","product":"Melodia","variety":"melodia","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868691","client":"expofrut","product":"Melodia","variety":"melodia","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868356","client":"expofrut","product":"Midnight Beauty","variety":"midnight","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868363","client":"expofrut","product":"Midnight Beauty","variety":"midnight","color":"negra","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868073","client":"expofrut","product":"Midnight Beauty","variety":"midnight","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868097","client":"expofrut","product":"Midnight Beauty","variety":"midnight","color":"negra","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868165","client":"expofrut","product":"Mista","variety":"mista","color":"mista","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868370","client":"expofrut","product":"Mista","variety":"mista","color":"mista","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868417","client":"expofrut","product":"Mista","variety":"mista","color":"mista","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868820","client":"expofrut","product":"Núbia","variety":"nubia","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868837","client":"expofrut","product":"Núbia","variety":"nubia","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868844","client":"expofrut","product":"Núbia","variety":"nubia","color":"negra","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868172","client":"expofrut","product":"Preta com semente","variety":"","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868400","client":"expofrut","product":"Preta sem semente","variety":"","color":"negra","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868325","client":"expofrut","product":"Preta sem semente","variety":"","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868981","client":"expofrut","product":"Preta sem semente","variety":"","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868387","client":"expofrut","product":"Red Globe","variety":"redglobe","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868394","client":"expofrut","product":"Red Globe","variety":"redglobe","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868080","client":"expofrut","product":"Red Globe","variety":"redglobe","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868608","client":"expofrut","product":"Red Seedless","variety":"","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868523","client":"expofrut","product":"Red Seedless","variety":"","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868103","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"500","klass":"Extra","kind":""},{"barcode":"7898923868431","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868622","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868035","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868059","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868134","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868189","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868462","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868240","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868257","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868349","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868448","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Sabor","kind":""},{"barcode":"7898923868110","client":"expofrut","product":"Sweet Globe","variety":"sweet","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868479","client":"expofrut","product":"Sweet Globe","variety":"sweet","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868486","client":"expofrut","product":"Sweet Globe","variety":"sweet","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868493","client":"expofrut","product":"Sweet Globe","variety":"sweet","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868264","client":"expofrut","product":"Thompson","variety":"","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868271","client":"expofrut","product":"Thompson","variety":"","color":"branca","weight":"500","klass":"Extra","kind":""},{"barcode":"7898923868509","client":"expofrut","product":"Thompson","variety":"","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868028","client":"expofrut","product":"Thompson","variety":"","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868745","client":"expofrut","product":"Timpson","variety":"timpson","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868752","client":"expofrut","product":"Timpson","variety":"timpson","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868769","client":"expofrut","product":"Timpson","variety":"timpson","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868776","client":"expofrut","product":"Timpson","variety":"timpson","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868332","client":"expofrut","product":"Vermelha sem semente","variety":"","color":"vermelha","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868318","client":"expofrut","product":"Vermelha sem semente","variety":"","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868998","client":"expofrut","product":"Vermelha sem semente","variety":"","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868158","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868196","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868226","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Extra","kind":""},{"barcode":"7898923868233","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868967","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868530","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868219","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868011","client":"expofrut","product":"White Seedless","variety":"","color":"branca","weight":"500","klass":"Exportação","kind":""},{"barcode":"7898923868141","client":"expofrut","product":"White Seedless","variety":"","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868516","client":"expofrut","product":"White Seedless","variety":"","color":"branca","weight":"500","klass":"Selecionada","kind":""}];
const clients=[["expofrut","Expofrut / Novo Rumo",["EXPOFRUT","NOVO RUMO"]],["caco","CACO",["CACO"]],["docemel","Doce Mel",["DOCE MEL","PICK NICK","PICK&NICK","DAHORA"]],["trielo","Trielo",["TRIELO"]],["debrand","Comércio de Frutas Debrand",["DEBRAND"]],["tt","T&T",["T&T"]],["assai","Assaí / Bratrade",["ASSAI","ASSAÍ","BRATRADE"]],["paguemenos","Pague Menos",["PAGUE MENOS"]],["casaavenida","Casa Avenida",["CASA AVENIDA"]],["gmap","GMAP",["GMAP"]],["condor","Condor",["CONDOR"]],["mambo","Mambo",["MAMBO"]],["patrulha","Patrulha Canina",["PATRULHA CANINA"]],["sangiuseppe","San Giuseppe",["SAN GIUSEPPE"]],["potiguara","Potiguara",["POTIGUARA"]],["cia","CIA PA / Qualitá",["QUALITA","QUALITÁ","CIA PA"]],["carrefour","Carrefour Mercado",["CARREFOUR MERCADO","CARREFOUR EXPO"]],["sq","Carrefour S&Q",["S&Q"]],["outro","Outro cliente / modelo aprovado",[]]], varieties=[["arra15","ARRA 15 / ARRA Sweeties","AR",["ARRA 15","ARRA SWEETIES"]],["sugar","Sugar Crisp / IFG Eleven","SR",["SUGAR CRISP","IFG ELEVEN"]],["autumn","Autumn Crisp","AC",["AUTUMN CRISP","SUGRATHIRTYFIVE"]],["sweet","Sweet Globe / IFG Ten","SG",["SWEET GLOBE","IFG TEN"]],["timpson","Timpson / Sheegene 2","TI",["TIMPSON","SHEEGENE 2"]],["vitoria","BRS Vitória","VI",["BRS VITORIA","BRS VITÓRIA","UVA VITORIA","UVA VITÓRIA"]],["melodia","BRS Melodia","ME",["BRS MELODIA","MELODIA"]],["nubia","BRS Núbia","NB",["NUBIA","NÚBIA"]],["isis","BRS Ísis","IS",["BRS ISIS","BRS ÍSIS","UVA ISIS"]],["midnight","Midnight Beauty","MB",["MIDNIGHT BEAUTY","MIDNIGHT"]],["scarlotta","Scarlotta Seedless","SC",["SCARLOTTA","SUGRANINETEEN"]],["itum9","Itum 9","I9",["ITUM 9","ITUMN NINE"]],["cherry","ARRA Cherry Crush","ACR",["CHERRY CRUSH","ARRA CHERRY"]],["redglobe","Red Globe","RG",["RED GLOBE"]],["mista","Uva mista","",["UVA MISTA"]]], kinds=[["caixa","Etiqueta de caixa"],["cumbuca500","Cumbuca 500 g"],["cumbuca250","Cumbuca 250 g"],["cinta500","Cinta 500 g"],["cinta250","Cinta 250 g"],["selo","Selo / etiqueta de data"],["sacola","Sacola"],["exportacao","Exportação"],["outro","Outro modelo"]];
const classes=["Campesita","Happy Tree / Extra A","Extra","Sacola","Selecionada","Sabor","Exportação","Outra"];

/* Conferência por foto — interface isolada do piloto administrativo. */
const producers=[
 ["EXPOFRUT BRASIL","04420687000256",""],
 ["FAZENDA NOVO RUMO","03438392000163","4069453004221"],
 ["AGROFRUTAS QUINTA DOS FERREIRAS","44396716000125","4063651217490"],
 ["BOA SORTE AGRICOLA","45955581000153",""],
 ["C&S GRAPE","32217363000170",""],
 ["FAZENDA ANDORINHAS","01258267000146","4049929471245"],
 ["SAINT RAISIN","52789137000170","4063651803235"],
 ["TERRITORIO DAS FRUTAS","23694327000106","4063061472472"],
 ["FAZENDA POTIGUARA","20658319000116",""],
 ["PURAFRUTA","08112538000108",""],
 ["AGRO COELHO","","4063651790115"],
 ["ANA CARIA STELITANO","","4049928881991"],
 ["ANTONIO AVERLAGEM NUNES CORCINO","","4063651344820"],
 ["EUDES BARBOSA","","4069453297081"],
 ["FABIO PASSOS","","4050373194062"],
 ["FLAVIO ANDRE FELLOWS","","4059883713985"],
 ["FLORINDA DO VALE","","4050373293741"],
 ["FRANCISCO DE ASSIS DE SA CARVALHO","","4063061990754"],
 ["GLEICEMERE BEZERRA","","4063061862044"],
 ["ITAMARA SOUZA","","4069453325159"],
 ["IVAN FERREIRA SOARES","","4063651649888"],
 ["JOSE ANTONIO ROMEIRA COELHO","","4063061376909"],
 ["JOSE DE SOUZA COELHO NETO","","4063061650405"],
 ["JOSE MARIA MENDES","","4049929471436"],
 ["LUZINEIDE NUNES SOARES","","4063061593177"],
 ["MARCIO AMORIM RODRIGUES","","4063651290475"],
 ["MARIA ODETE","","4049928205612"],
 ["NILSON COSTA GUIRAO","","4050373221607"],
 ["VANIA VIDAL SAMPAIO","","4063651803235"],
 ["WILKER OLIVEIRA TORRES","","4063061901446"]
];
const sortedClients=clients.slice().sort((a,b)=>a[1].localeCompare(b[1],"pt-BR",{sensitivity:"base"}));
const state={
 photo:null,url:null,sourceFile:null,sourceUrl:null,text:"",barcode:"",detected:null,
 identity:{client:"",kind:"",variety:"",klass:""},clientConfirmed:false,
 expected:{year:String(new Date().getFullYear()).slice(-2),area:"",valve:"",day:"",month:"",method:"",variety:""},
 fields:{},sources:{},issues:[],matches:[],history:[],notes:"",reviewed:false,saved:false,
 mode:"empty",crop:{cx:.5,cy:.5,scale:.85,ratio:1.5},processing:false,sequence:0
};
let ctx=null,cameraStream=null;
const el=id=>document.getElementById(id);
const str=v=>String(v==null?"":v);
const esc=v=>str(v).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[s]));
const norm=v=>str(v).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/\s+/g," ").trim();
const digits=v=>str(v).replace(/\D/g,"");
const distinct=a=>[...new Set(a.filter(Boolean))];
const nameOf=(list,id)=>list.find(x=>x[0]===id)?.[1]||"A confirmar";
const eanValid=v=>{const n=digits(v);if(n.length!==13)return false;let sum=0;for(let k=0;k<12;k++)sum+=Number(n[k])*(k%2?3:1);return (10-sum%10)%10===Number(n[12]);};
const opts=(list,value,empty)=>'<option value="">'+esc(empty||"Selecione")+'</option>'+list.map(x=>'<option value="'+esc(x[0])+'"'+(x[0]===value?" selected":"")+'>'+esc(x[1])+'</option>').join("");
function notice(message,error=false){
 const e=el("vl2-notice");if(!e)return;
 e.hidden=!message;e.className=error?"vl2-notice vl2-error":"vl2-notice";e.textContent=message;
}
function stopCamera(){
 if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null;}
 const v=el("vl2-video");if(v){v.pause();v.srcObject=null;v.hidden=true;}
}
function releasePhoto(){
 stopCamera();
 for(const key of ["url","sourceUrl"])if(state[key]){URL.revokeObjectURL(state[key]);state[key]=null;}
 state.photo=null;state.sourceFile=null;
}
function resetScan(){
 state.sequence++;state.photo=null;state.text="";state.barcode="";state.detected=null;
 state.fields={};state.sources={};state.issues=[];state.matches=[];state.reviewed=false;state.saved=false;
 state.identity={client:"",kind:"",variety:"",klass:""};state.clientConfirmed=false;
 state.expected={year:String(new Date().getFullYear()).slice(-2),area:"",valve:"",day:"",month:"",method:"",variety:""};
 state.notes="";state.mode="empty";
}
function validCnpj(raw){
 const n=digits(raw);if(n.length!==14||/^(\d)\1+$/.test(n))return false;
 const check=(limit)=>{let sum=0,weight=limit-7;for(let i=0;i<limit;i++){sum+=Number(n[i])*weight--;if(weight<2)weight=9;}let v=sum%11;return v<2?0:11-v;};
 return check(12)===Number(n[12])&&check(13)===Number(n[13]);
}
function parseTrace(value){
 const m=norm(value).replace(/[–—]/g,"-").match(/^R-(\d{2})-(\d{3,5})([A-Z])-(\d{2})(\d{2})-([C58])-([A-Z]{2,3})$/);
 return m?{year:m[1],area:m[2],valve:m[3],day:m[4],month:m[5],method:m[6],variety:m[7]}:null;
}
function expectedCode(){
 const x=state.expected;
 if(!x.year||!x.area||!x.valve||!x.day||!x.month||!x.method||!x.variety)return "";
 return "R-"+x.year+"-"+x.area+x.valve+"-"+x.day+x.month+"-"+x.method+"-"+x.variety;
}
function expectedVariety(){
 return varieties.find(x=>x[2]===state.expected.variety)?.[0]||"";
}
function getEAN(raw){
 const plain=str(raw).replace(/(?:GGN|GLOBALGAP|GLOBAL G A P)\s*:?\s*(\d[\d\s-]{11,20})/gi," ");
 const codes=(plain.match(/(?:\d[\s-]*){13}/g)||[]).map(digits);
 const matches=codes.filter(x=>catalog.some(p=>p.barcode===x));
 return matches.find(eanValid)||codes.find(eanValid)||matches[0]||"";
}
function extract(raw,barcode){
 const n=norm(raw), b=barcode||getEAN(raw);
 const matches=catalog.filter(x=>x.barcode===b);
 const candidateClients=distinct(matches.map(x=>x.client));
 const rawWords=distinct(clients.filter(x=>x[2].some(a=>a&&n.includes(norm(a)))).map(x=>x[0]));
 // EXPOFRUT pode aparecer apenas como comerciante, sem ser o cliente da marca.
 const words=rawWords.filter(x=>x!=="expofrut"||!n.includes("COMERCIALIZADO POR")||candidateClients.length===1&&candidateClients[0]==="expofrut");
 const agreed=candidateClients.filter(x=>words.includes(x));
 const foundClient=agreed.length===1?agreed[0]:words.length===1?words[0]:candidateClients.length===1?candidateClients[0]:"";
 const traceMatch=str(raw).match(/\bR[\s\-–—]*(\d{2})[\s\-–—]*(\d{3,5}[A-Za-z])[\s\-–—]*(\d{4})[\s\-–—]*([C58])[\s\-–—]*([A-Za-z]{2,3})\b/i);
 const trace=traceMatch?"R-"+traceMatch[1]+"-"+traceMatch[2].toUpperCase()+"-"+traceMatch[3]+"-"+traceMatch[4].toUpperCase()+"-"+traceMatch[5].toUpperCase():"";
 const track=parseTrace(trace),group=matches.filter(x=>!foundClient||x.client===foundClient);
 const wordVar=varieties.filter(x=>x[3].some(alias=>n.includes(norm(alias))));
 const suffixVar=varieties.filter(x=>track&&x[2]===track.variety);
 const codeVar=distinct(group.map(x=>x.variety));
 const variety=wordVar.length===1?wordVar[0][0]:suffixVar.length===1?suffixVar[0][0]:codeVar.length===1?codeVar[0]:"";
 let klass="";
 if(/\bEXTRA\s*A\b|\bHAPPY\s*TREE\b/.test(n))klass="Happy Tree / Extra A";
 else if(/\bCAMPESITA\b/.test(n))klass="Campesita";
 else if(/\bSELECIONADA\b/.test(n))klass="Selecionada";
 else if(/\bSABOR\b/.test(n))klass="Sabor";
 else if(/\bEXTRA\b/.test(n))klass="Extra";
 else {const classesFromCode=distinct(group.map(x=>x.klass));if(classesFromCode.length===1)klass=classesFromCode[0];}
 const printedWeight=str(raw).match(/\b(?:PESO\s*[:=]?\s*)?(\d{1,2}(?:[,.]\d{1,2})?)\s*(KG|G)\b/i);
 const codeWeights=distinct(group.map(x=>x.weight));
 const weightPhoto=printedWeight?printedWeight[1].replace(".",",")+" "+printedWeight[2].toLowerCase():"";
 const weightCatalog=codeWeights.length===1?codeWeights[0]+" g":"";
 const peso=weightPhoto||weightCatalog;
 const classCode=n.match(/\b(MEI|EX)\s*[-]?\s*([VPA]{1,2})(50|80)([A-Z]{2,3})(10|20|21)\b/);
 let kind="";
 const explicitCinta=/\bCINTA\b/.test(n),explicitCumbuca=/\bCUMBUCA\b/.test(n);
 const printedCnpj=/\bCNPJ\b/.test(n),printedGgn=/\bGGN\b/.test(n);
 const boxEvidence=!!classCode||/\bCAIXA\b|\b(?:5|8)\s*KG\b/.test(n);
 const wG=/\b250\s*G\b/.test(n)?"250":/\b500\s*G\b/.test(n)?"500":/^\d{3} G$/i.test(peso)?digits(peso):"";
 const catalogKind=distinct(group.map(x=>x.kind));
 if(explicitCinta&&wG)kind="cinta"+wG;
 else if(explicitCumbuca&&wG)kind="cumbuca"+wG;
 else if(boxEvidence)kind="caixa";
 else if(/\bSELO\b/.test(n))kind="selo";
 else if(catalogKind.length===1&&catalogKind[0])kind=catalogKind[0];
 else if(wG&&b&&!printedCnpj&&!printedGgn)kind="cumbuca"+wG;
 // Códigos 20/21 identificam a embalagem, mas não comprovam o tamanho físico da etiqueta.
 const dateMatch=str(raw).match(/\b([0-3]?\d)[.\/-]([01]?\d)[.\/-]((?:20)?\d{2})\b/);
 const date=dateMatch?dateMatch[1].padStart(2,"0")+"/"+dateMatch[2].padStart(2,"0")+"/"+(dateMatch[3].length===2?"20"+dateMatch[3]:dateMatch[3]):track?track.day+"/"+track.month+"/20"+track.year:"";
 const lot=str(raw).match(/\b(?:LOTE|LOT)\s*[:#-]?\s*([0-9A-Z./-]{2,24})\b/i)?.[1]||"";
 const cnpjPattern=/\bCNPJ\s*[:#-]?\s*(\d{2}[.\s]?\d{3}[.\s]?\d{3}[/\s]?\d{4}[-\s]?\d{2})/gi;
 const candidates=[...str(raw).matchAll(cnpjPattern)].map(x=>digits(x[1]));
 const producedSection=str(raw).split(/PRODUZIDO POR/i)[1]?.split(/COMERCIALIZADO POR|RASTREABILIDADE/i)[0]||"";
 const companySection=str(raw).split(/COMERCIALIZADO POR/i)[1]?.split(/PRODUZIDO POR|RASTREABILIDADE/i)[0]||"";
 const producerCnpj=digits(producedSection.match(cnpjPattern)?.[0]||"");
 const companyCnpj=digits(companySection.match(cnpjPattern)?.[0]||"");
 const cnpj=producerCnpj||(candidates.length===1&&!companySection?candidates[0]:"");
 const ggn=str(raw).match(/\b(?:GGN|GLOBALGAP|GLOBAL\s*G\.?A\.?P\.?)\s*[:#-]?\s*(\d[\d\s-]{11,18})/i)?.[1]||"";
 const ggnNumber=digits(ggn).slice(0,13);
 const producer=producers.find(p=>producedSection&&norm(producedSection).includes(norm(p[0])))||producers.find(p=>p[1]&&digits(cnpj)===p[1])||producers.find(p=>p[2]&&ggnNumber===p[2])||(!companySection?producers.find(p=>n.includes(norm(p[0]))):null)||null;
 const commer=producers.find(p=>companySection&&norm(companySection).includes(norm(p[0])))||null;
 const refWeight=classCode?classCode[3]==="50"?"5 kg":classCode[3]==="80"?"8 kg":"":"";
 return {
  detectedClient:foundClient,codeClients:candidateClients,wordClients:words,identity:{kind,variety,klass},
  fields:{barcode:b,rastreio:trace,data:date,lote:lot,peso,produto:group.length===1?group[0].product:"",cnpj:cnpj?digits(cnpj):"",cnpjComercial:companyCnpj,ggn:ggnNumber,produtor:producer?.[0]||"",comercializado:commer?.[0]||""},
  sources:{barcode:b?"Foto / código de barras":"",rastreio:trace?"Foto":"",peso:weightPhoto?"Foto":weightCatalog?"Catálogo":"",data:dateMatch?"Foto":track?"Código de rastreabilidade":"",cnpj:cnpj?"Foto":"",ggn:ggnNumber?"Foto":"",produto:group.length===1?"Catálogo":""},
  producer,commer,weightPhoto,weightCatalog,refWeight,packedKindCode:classCode?.[5]||"",track,printedDate:dateMatch?date:"",matches,barcodeClients:candidateClients,clientAmbiguous:candidateClients.length>1&&agreed.length!==1
 };
}
function computeIssues(){
 const out=[],add=(type,title,body)=>out.push({type,title,body});
 const detected=state.detected,f=state.fields,x=state.expected,chosen=state.identity.client,real=detected?.detectedClient||"";
 if(!state.photo)return out;
 if(!chosen||!state.clientConfirmed)add("confirmar","Cliente","Selecione ou confirme o cliente que receberá a etiqueta.");
 if(real&&chosen&&state.clientConfirmed&&chosen!==real){
  const certain=detected.wordClients.length===1||detected.codeClients.length===1;
  add(certain?"atencao":"confirmar","Cliente divergente","O cliente selecionado é "+nameOf(clients,chosen)+", mas a identificação da foto sugere "+nameOf(clients,real)+".");
 }
 if(!real&&detected?.clientAmbiguous)add("confirmar","Cliente compartilhado","Esse código de barras aparece em mais de um cliente do catálogo. Confira a marca impressa.");
 if(!real&&state.clientConfirmed)add("confirmar","Cliente não reconhecido na foto","O cliente foi informado, mas a imagem não permitiu identificá-lo para confirmar a correspondência.");
 if(detected?.wordClients?.length>1&&!detected.codeClients.length)add("confirmar","Marcas diferentes","A imagem contém nomes de mais de um cliente. Confira o modelo correto.");
 if(f.barcode&&!eanValid(f.barcode))add("atencao","Código de barras","O dígito verificador do EAN-13 não corresponde.");
 if(f.barcode&&chosen&&detected?.codeClients.length===1&&detected.codeClients[0]!==chosen&&detected.wordClients.length===0){
  add("confirmar","Referência comercial","O código está associado a outro cliente no catálogo, mas pode haver autorização para usar o código do produtor.");
 }
 if(!state.identity.kind)add("confirmar","Tipo de etiqueta","A foto não permite distinguir com segurança etiqueta de caixa e de cumbuca. Revise em «Corrigir leitura».");
 if(!state.identity.variety&&!expectedVariety())add("confirmar","Variedade","Não foi possível identificar a variedade na etiqueta.");
 const observed=f.rastreio,expected=expectedCode();
 if(!expected)add("confirmar","Rastreabilidade de referência","Selecione os segmentos da rastreabilidade real da produção para comparar com a foto.");
 if(expected&&!parseTrace(expected))add("atencao","Rastreabilidade informada","A combinação de segmentos não respeita o padrão registrado no manual.");
 if(expected&&!observed)add("confirmar","Rastreabilidade da foto","O código não foi lido com segurança; não é possível confirmar a correspondência.");
 if(expected&&observed&&norm(expected)!==norm(observed))add("atencao","Rastreabilidade divergente","Foto: "+observed+" · Referência informada: "+expected+".");
 if(f.rastreio&&detected.track){
  const variety=state.identity.variety||expectedVariety();
  const foundVar=varieties.find(v=>v[0]===variety)?.[2]||"";
  if(foundVar&&foundVar!==detected.track.variety)add("atencao","Sigla da variedade","A rastreabilidade apresenta "+detected.track.variety+"; a variedade identificada corresponde a "+foundVar+".");
 }
 if(state.identity.variety&&expectedVariety()&&state.identity.variety!==expectedVariety())add("atencao","Variedade de referência","A sigla selecionada na rastreabilidade não corresponde à variedade identificada na foto.");
 if(detected?.track&&(Number(detected.track.day)>31||Number(detected.track.day)<1||Number(detected.track.month)>12||Number(detected.track.month)<1))add("atencao","Data na rastreabilidade","A data lida apresenta dia ou mês inválido.");
 if(detected?.printedDate&&detected.track&&detected.printedDate!==detected.track.day+"/"+detected.track.month+"/20"+detected.track.year)add("atencao","Data da embalagem","A data impressa não coincide com o dia e mês codificados na rastreabilidade.");
 if(detected?.weightPhoto&&detected?.refWeight&&norm(detected.weightPhoto)!==norm(detected.refWeight))add("confirmar","Peso e identificação","O peso individual e o código da caixa representam grandezas diferentes. Confira o modelo correspondente.");
 if(category()==="unit"&&detected?.weightPhoto&&detected?.weightCatalog&&/\bG\b/i.test(detected.weightPhoto)&&norm(detected.weightPhoto.replace(",", "."))!==norm(detected.weightCatalog.replace(",",".")))add("atencao","Peso","O peso impresso difere do cadastrado para o código de barras.");
 if(detected?.packedKindCode&&["20","21"].includes(detected.packedKindCode)&&/^\d+ G$/i.test(norm(f.peso))){
   const w=digits(f.peso),expectedUnit=detected.packedKindCode==="20"?"500":"250";
   if(w!==expectedUnit)add("atencao","Tipo de embalagem","O código da embalagem indica "+expectedUnit+" g, mas o peso lido é "+w+" g.");
 }
 if(f.cnpj&&!validCnpj(f.cnpj))add("atencao","CNPJ","Os dígitos do CNPJ reconhecido não passaram na validação. Confira a impressão.");
 if(/\bCNPJ\b/i.test(state.text)&&!f.cnpj&&!f.cnpjComercial)add("confirmar","CNPJ ilegível","Há referência a CNPJ na etiqueta, mas nenhum número foi identificado com segurança.");
 if(/\bGGN\b/i.test(state.text)&&!f.ggn)add("confirmar","GGN ilegível","Há referência a GGN, mas o número não foi recuperado com segurança.");
 if(detected?.producer?.[1]&&f.cnpj&&f.cnpj!==detected.producer[1])add("atencao","CNPJ do produtor","O CNPJ reconhecido difere do cadastro de "+detected.producer[0]+" no DOC.CQ.056.");
 if(f.cnpjComercial&&!validCnpj(f.cnpjComercial))add("atencao","CNPJ do comerciante","O dígito verificador do CNPJ comercial não confere.");
 if(detected?.commer?.[1]&&f.cnpjComercial&&f.cnpjComercial!==detected.commer[1])add("atencao","CNPJ do comerciante","CNPJ impresso diferente da referência para "+detected.commer[0]+".");
 if(detected?.producer?.[2]&&f.ggn&&f.ggn!==detected.producer[2])add("atencao","GGN do produtor","O GGN reconhecido difere da referência de "+detected.producer[0]+" no DOC.CQ.056.");
 if((f.cnpj||f.ggn)&&!detected?.producer)add("confirmar","Cadastro do produtor","Identificação numérica detectada, mas não foi possível associá-la com segurança a um produtor do manual.");
 const relevantMatches=state.matches.filter(m=>m.client===chosen);
 const uniqueClass=distinct(relevantMatches.map(m=>m.klass));
 if(state.identity.klass&&uniqueClass.length===1&&uniqueClass[0]!==state.identity.klass)add("atencao","Classificação","A classe impressa difere do padrão cadastrado para o código e cliente selecionados.");
 if(!state.text&&!state.barcode)add("confirmar","Imagem","Nenhuma informação legível foi reconhecida. Fotografe novamente com melhor iluminação.");
 return out;
}
async function loadPatterns(){
 if(!ctx?.canAccess?.())return;
 try{
  const data=await ctx.api("patterns");
  for(const p of Array.isArray(data.rows)?data.rows:[]){
   if(!eanValid(p.barcode)||!clients.some(x=>x[0]===p.client)||!kinds.some(x=>x[0]===p.label_kind)||!varieties.some(x=>x[0]===p.variety))continue;
   if(catalog.some(x=>x.barcode===p.barcode&&x.client===p.client&&x.variety===p.variety&&x.kind===p.label_kind&&x.klass===(p.label_class||"")))continue;
   catalog.push({barcode:p.barcode,client:p.client,product:p.product||"",variety:p.variety,color:"",
    weight:digits(p.weight).slice(0,4),kind:p.label_kind,klass:p.label_class||"",source:"Padrão validado no histórico"});
  }
 }catch{notice("Catálogo complementar temporariamente indisponível. A consulta local continua ativa.",true);}
}
function drawCrop(){
 const stage=el("vl2-stage"),frame=el("vl2-frame");if(!stage||!frame)return;
 const sw=stage.clientWidth,sh=stage.clientHeight;if(!sw||!sh)return;
 const ratio=state.crop.ratio,sz=state.crop.scale;
 const w=Math.min(sw*sz,sh*sz*ratio),h=w/ratio;
 const x=Math.max(0,Math.min(sw-w,state.crop.cx*sw-w/2));
 const y=Math.max(0,Math.min(sh-h,state.crop.cy*sh-h/2));
 frame.style.cssText="width:"+w+"px;height:"+h+"px;left:"+x+"px;top:"+y+"px";
}
function frameBounds(){
 const stage=el("vl2-stage"),frame=el("vl2-frame");if(!stage||!frame)return null;
 return {x:frame.offsetLeft,y:frame.offsetTop,w:frame.offsetWidth,h:frame.offsetHeight,sw:stage.clientWidth,sh:stage.clientHeight};
}
function positionMode(mode){
 state.mode=mode;
 const empty=el("vl2-empty"),img=el("vl2-image"),video=el("vl2-video"),frame=el("vl2-frame"),cropping=el("vl2-crop-tools");
 if(empty)empty.hidden=mode!=="empty";
 if(img)img.hidden=!["crop","ready"].includes(mode);
 if(video)video.hidden=mode!=="camera";
 if(frame)frame.hidden=!["crop","camera"].includes(mode);
 if(cropping)cropping.hidden=!["crop","camera"].includes(mode);
 if(el("vl2-capture"))el("vl2-capture").hidden=mode!=="camera";
 if(el("vl2-apply-crop"))el("vl2-apply-crop").hidden=mode!=="crop";
 if(mode==="crop"||mode==="camera")requestAnimationFrame(drawCrop);
}
function setPhoto(file){
 if(state.url)URL.revokeObjectURL(state.url);
 state.photo=file;state.url=URL.createObjectURL(file);
 const image=el("vl2-image");if(image)image.src=state.url;
 positionMode("ready");
}
function photoFromCanvas(canvas){
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>{
  if(!blob)return reject(Error("Não foi possível recortar a imagem."));
  resolve(new File([blob],"etiqueta-"+Date.now()+".jpg",{type:"image/jpeg"}));
 },"image/jpeg",.93));
}
function cropCanvas(image,iw,ih){
 const frame=frameBounds();if(!frame)throw Error("Área de enquadramento indisponível.");
 const scale=Math.max(frame.sw/iw,frame.sh/ih);
 const offsetX=(frame.sw-iw*scale)/2,offsetY=(frame.sh-ih*scale)/2;
 const sx=Math.max(0,(frame.x-offsetX)/scale),sy=Math.max(0,(frame.y-offsetY)/scale);
 const width=Math.min(iw-sx,frame.w/scale),height=Math.min(ih-sy,frame.h/scale);
 const out=document.createElement("canvas"),factor=Math.min(1,2200/width);
 out.width=Math.max(1,Math.round(width*factor));out.height=Math.max(1,Math.round(height*factor));
 out.getContext("2d").drawImage(image,sx,sy,width,height,0,0,out.width,out.height);
 return out;
}
async function finishCrop(){
 const item=state.sourceFile;if(!item||state.processing)return;
 state.processing=true;
 try{
  const bmp=await createImageBitmap(item);
  const canvas=cropCanvas(bmp,bmp.width,bmp.height);bmp.close?.();
  const file=await photoFromCanvas(canvas);
  setPhoto(file);await readPhoto();
 }catch(e){notice("Não foi possível recortar a foto. Escolha outra imagem.",true);}
 finally{state.processing=false;}
}
async function useFile(file){
 if(!file)return;
 if(!/^image\/(jpeg|png|webp)$/i.test(file.type)||file.size>10*1024*1024){notice("Escolha imagem JPG, PNG ou WebP de até 10 MB.",true);return;}
 releasePhoto();resetScan();
 state.sourceFile=file;state.sourceUrl=URL.createObjectURL(file);
 const img=el("vl2-image");if(img)img.src=state.sourceUrl;
 state.crop={cx:.5,cy:.5,scale:.82,ratio:1.5};
 positionMode("crop");notice("Mova o quadro para cobrir apenas a etiqueta. Depois toque em «Recortar e analisar».");
 showResult();
}
async function beginCamera(){
 if(!navigator.mediaDevices?.getUserMedia){notice("Câmera integrada indisponível. Use «Escolher foto».",true);return;}
 stopCamera();releasePhoto();resetScan();
 try{
  cameraStream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{exact:"environment"},width:{ideal:1920},height:{ideal:1440}}});
 }catch{
  try{
   const devs=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==="videoinput");
   const back=devs.find(d=>/back|rear|traseira|environment|posterior/i.test(d.label));
   if(!back)throw Error("Sem traseira");
   cameraStream=await navigator.mediaDevices.getUserMedia({audio:false,video:{deviceId:{exact:back.deviceId}}});
  }catch{notice("Câmera traseira indisponível. Use «Escolher foto»; nenhuma câmera frontal foi aberta.",true);return;}
 }
 const track=cameraStream.getVideoTracks()[0],setting=track?.getSettings?.()||{};
 if(setting.facingMode==="user"||/front|frontal|selfie/i.test(track?.label||"")){
  stopCamera();notice("O aparelho tentou abrir a câmera frontal. Use uma foto feita pela câmera traseira.",true);return;
 }
 const video=el("vl2-video");if(!video){stopCamera();return;}
 video.srcObject=cameraStream;
 state.crop={cx:.5,cy:.5,scale:.85,ratio:1.5};positionMode("camera");
 try{await video.play();}catch{stopCamera();positionMode("empty");notice("Não foi possível iniciar a câmera traseira.",true);return;}
 showResult();
 notice("Centralize uma única etiqueta dentro do quadro. Apenas essa área será fotografada.");
}
async function captureCamera(){
 const video=el("vl2-video");if(!cameraStream||!video?.videoWidth||state.processing)return;
 state.processing=true;
 try{
  const canvas=cropCanvas(video,video.videoWidth,video.videoHeight);
  const file=await photoFromCanvas(canvas);
  stopCamera();setPhoto(file);await readPhoto();
 }catch{notice("A captura falhou. Confira o enquadramento e tente novamente.",true);}
 finally{state.processing=false;}
}
async function ensureOCR(){
 if(window.Tesseract?.createWorker)return;
 await new Promise((resolve,reject)=>{
  const old=document.querySelector("script[data-vl2-ocr]");
  if(old){if(window.Tesseract?.createWorker)return resolve();old.addEventListener("load",resolve,{once:true});old.addEventListener("error",reject,{once:true});return;}
  const tag=document.createElement("script");tag.src="https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
  tag.async=true;tag.dataset.vl2Ocr="true";tag.onload=resolve;tag.onerror=reject;document.head.appendChild(tag);
 });
 if(!window.Tesseract?.createWorker)throw Error("OCR indisponível");
}
async function scanBarcode(file){
 if(typeof BarcodeDetector==="undefined")return "";
 let bitmap=null;
 try{
  bitmap=await createImageBitmap(file);
  const detector=new BarcodeDetector({formats:["ean_13","ean_8","upc_a"]});
  const found=await detector.detect(bitmap);
  return found.find(x=>eanValid(x.rawValue))?.rawValue||"";
 }catch{return "";}finally{bitmap?.close?.();}
}
async function readPhoto(){
 if(!state.photo||!ctx?.canAccess?.())return;
 const seq=++state.sequence,progress=el("vl2-progress");
 if(progress){progress.hidden=false;progress.textContent="Lendo códigos e textos da etiqueta recortada…";}
 let worker=null,recognized="",barcode="",failed=false;
 try{
  barcode=await scanBarcode(state.photo);
  try{
   await ensureOCR();
   if(progress)progress.textContent="Consultando as referências do manual e do catálogo…";
   worker=await window.Tesseract.createWorker("por+eng",1);
   recognized=str((await worker.recognize(state.photo)).data?.text).trim();
  }catch{failed=true;}
  if(seq!==state.sequence||!ctx?.canAccess?.())return;
  const data=extract(recognized,barcode);
  state.text=recognized;state.barcode=barcode||data.fields.barcode;state.detected=data;
  state.fields=data.fields;state.sources=data.sources;state.matches=data.matches;
  // Uma escolha explícita feita antes da foto nunca é substituída pelo OCR.
  if(!state.clientConfirmed)state.identity.client=data.detectedClient;
  state.identity.kind=data.identity.kind;state.identity.variety=data.identity.variety;state.identity.klass=data.identity.klass;
  state.issues=computeIssues();showResult();
  notice(failed?"Texto não reconhecido integralmente. Confira o que ficou pendente.":"Leitura realizada. Compare a rastreabilidade e confirme o cliente.",failed);
 }finally{
  try{await worker?.terminate();}catch{}
  if(progress)progress.hidden=true;
 }
}
function clientChooser(){
 const active=state.identity.client;
 return '<div class="vl2-client-wrap"><div class="vl2-control-label">Cliente <small>seleção obrigatória</small></div>'+
  '<details class="vl2-client-combo" id="vl2-client-combo"><summary><span class="vl2-search-icon" aria-hidden="true">⌕</span><strong>'+esc(active?nameOf(clients,active):"Pesquisar ou selecionar cliente")+'</strong><em>'+esc(state.clientConfirmed?"Alterar":"Confirmar")+'</em></summary>'+
  '<div class="vl2-client-pop"><input id="vl2-client-search" type="search" autocomplete="off" aria-label="Pesquisar cliente" placeholder="Digite o nome do cliente…"><div class="vl2-client-options">'+
  sortedClients.map(c=>'<button type="button" data-vl2-client="'+esc(c[0])+'" data-label="'+esc(norm(c[1]))+'">'+esc(c[1])+'</button>').join("")+
  '</div></div></details><p class="vl2-help">'+(state.clientConfirmed?"Cliente confirmado. Você pode alterá-lo a qualquer momento.":active?"Identificação sugerida pela foto; toque para confirmar.":"Escolha o cliente para cruzar com a etiqueta.")+'</p></div>';
}
function traceOptions(items,key,placeholder){
 return '<select data-vl2-trace="'+key+'" aria-label="'+key+'">'+opts(items,state.expected[key],placeholder)+'</select>';
}
function traceBuilder(){
 const year=Number(new Date().getFullYear());
 const years=Array.from({length:11},(_,i)=>{const y=String(year-5+i).slice(-2);return [y,String(year-5+i)];});
 const day=Array.from({length:31},(_,i)=>[String(i+1).padStart(2,"0"),String(i+1).padStart(2,"0")]);
 const month=Array.from({length:12},(_,i)=>[String(i+1).padStart(2,"0"),String(i+1).padStart(2,"0")]);
 const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(x=>[x,x]);
 const varietiesCodes=varieties.filter(x=>x[2]).slice().sort((a,b)=>a[1].localeCompare(b[1],"pt-BR")).map(x=>[x[2],x[1]]);
 const expected=expectedCode(),observed=state.fields.rastreio||"";
 const same=expected&&observed&&norm(expected)===norm(observed);
 const status=expected?(observed?(same?"Conferida: códigos correspondem":"Divergência com a foto"):"Referência completa; aguardando leitura da foto"):"Selecione os campos da produção";
 return '<section class="vl2-trace" aria-label="Rastreabilidade de referência"><div class="vl2-trace-title"><strong>Rastreabilidade</strong><span>Conferência obrigatória</span></div>'+
  '<p>Informe a rastreabilidade real da produção. O código lido na foto será comparado separadamente.</p>'+
  '<div class="vl2-trace-grid">'+
  '<label>Prefixo<input readonly value="R" aria-label="Prefixo R"></label>'+
  '<label>Ano'+traceOptions(years,"year","Ano")+'</label>'+
  '<label class="vl2-trace-area">Área<input data-vl2-trace="area" inputmode="numeric" maxlength="5" list="vl2-areas" value="'+esc(state.expected.area)+'" placeholder="Ex.: 0210"><datalist id="vl2-areas">'+distinct([state.detected?.track?.area,...(state.history||[]).map(x=>parseTrace(x?.fields?.rastreio||"")?.area)]).filter(Boolean).map(x=>'<option value="'+esc(x)+'"></option>').join("")+'</datalist></label>'+
  '<label>Válvula'+traceOptions(letters,"valve","Válvula")+'</label>'+
  '<label>Dia'+traceOptions(day,"day","Dia")+'</label>'+
  '<label>Mês'+traceOptions(month,"month","Mês")+'</label>'+
  '<label>Pesagem'+traceOptions([["C","C · Contentor"],["5","5 · Caixa 5 kg"],["8","8 · Caixa 8 kg"]],"method","Método")+'</label>'+
  '<label>Variedade'+traceOptions(varietiesCodes,"variety","Sigla")+'</label></div>'+
  '<div class="vl2-trace-compare"><div><small>Na fotografia</small><strong>'+esc(observed||"Não identificado")+'</strong></div><div><small>Referência informada</small><strong>'+esc(expected||"Preenchimento incompleto")+'</strong></div></div>'+
  '<div class="vl2-trace-status '+(same?"vl2-matched":expected&&observed?"vl2-different":"")+'">'+esc(status)+'</div></section>';
}
function fact(label,value,source){
 return '<div class="vl2-fact"><small>'+esc(label)+'</small><strong>'+esc(value||"Não identificado")+'</strong>'+(source?'<span>'+esc(source)+'</span>':"")+'</div>';
}
function category(){
 const k=state.identity.kind;
 return ["caixa","sacola","exportacao"].includes(k)?"box":["cumbuca500","cumbuca250","cinta500","cinta250"].includes(k)?"unit":"other";
}
function detailsView(){
 const k=state.identity.kind,v=state.identity.variety,f=state.fields,src=state.sources;
 if(!state.photo)return '<div class="vl2-start"><strong>Fotografe uma única etiqueta</strong><p>O VITRA identifica o modelo, lê os dados impressos e cruza o que foi reconhecido com o manual e os padrões cadastrados.</p></div>';
 let facts=fact("Tipo de etiqueta",nameOf(kinds,k),k?"Reconhecido · alterável em ajustes":"Não foi possível identificar com segurança")+
  fact("Variedade",nameOf(varieties,v),v?"Rastreabilidade / texto / catálogo":"A confirmar")+
  fact("Classificação",state.identity.klass,"Identificada quando disponível");
 if(category()==="box"){
  facts+=fact("Peso da caixa",f.peso,src.peso)+fact("Lote",f.lote,src.lote)+
    fact("Produtor",f.produtor,src.produtor)+fact("CNPJ do produtor",f.cnpj,src.cnpj)+fact("GGN",f.ggn,src.ggn)+
    fact("Comercializado por",f.comercializado,src.comercializado)+fact("CNPJ comercial",f.cnpjComercial,src.cnpjComercial)+
    fact("Data de embalagem",f.data,src.data)+fact("Código de barras",f.barcode,src.barcode);
 }else if(category()==="unit"){
  facts+=fact("Peso da unidade",f.peso,src.peso)+fact("Código de barras",f.barcode,src.barcode)+
    fact("Produto",f.produto,src.produto)+fact("Data da embalagem",f.data,src.data);
 }else{
  facts+=fact("Peso identificado",f.peso,src.peso)+fact("Código de barras",f.barcode,src.barcode)+fact("Data",f.data,src.data);
 }
 return '<div class="vl2-facts">'+facts+'</div>';
}
function correctionPanel(){
 return '<details class="vl2-refine"><summary>Corrigir leitura ou tipo de etiqueta</summary>'+
  '<div class="vl2-correction-grid"><label>Tipo reconhecido<select data-vl2-identity="kind">'+opts(kinds,state.identity.kind,"Não identificado")+'</select></label>'+
  '<label>Variedade reconhecida<select data-vl2-identity="variety">'+opts(varieties,state.identity.variety,"Não identificada")+'</select></label>'+
  '<label>Classificação reconhecida<select data-vl2-identity="klass">'+opts(classes.map(x=>[x,x]),state.identity.klass,"Não identificada")+'</select></label></div>'+
  '<p class="vl2-refine-hint">Os dados abaixo são extraídos da foto. Corrija apenas erros de leitura; não é necessário preenchê-los para realizar a conferência.</p>'+
  '<div class="vl2-correction-grid">'+[["rastreio","Rastreabilidade lida"],["peso","Peso"],["barcode","EAN"],["data","Data"],["lote","Lote"],["produtor","Produtor"],["cnpj","CNPJ do produtor"],["cnpjComercial","CNPJ comercial"],["ggn","GGN"],["produto","Produto"]].map(x=>
    '<label>'+esc(x[1])+'<input data-vl2-field="'+x[0]+'" value="'+esc(state.fields[x[0]]||"")+'"></label>').join("")+'</div>'+
  '<details class="vl2-raw"><summary>Texto bruto extraído</summary><pre>'+esc(state.text||"Sem leitura")+'</pre></details></details>';
}
function showResult(){
 const root=el("vl2-results");if(!root)return;
 state.issues=computeIssues();
 const alerts=state.issues.filter(x=>x.type==="atencao"),pending=state.issues.filter(x=>x.type==="confirmar");
 const overall=!state.photo?"Pronto para começar":alerts.length?"Divergências encontradas":pending.length?"Conferência pendente":"Nenhuma divergência identificada";
 const count=state.photo?'<span>'+alerts.length+' divergência(s) · '+pending.length+' pendência(s)</span>':"";
 const status='<div class="vl2-status '+(alerts.length?"vl2-alert":pending.length?"vl2-partial":"")+'"><div><small>CONFERÊNCIA DA ETIQUETA</small><strong>'+overall+'</strong></div>'+count+'</div>';
 const issues=state.issues.length?'<div class="vl2-alerts">'+state.issues.map(x=>'<div class="vl2-message vl2-'+x.type+'"><strong>'+esc(x.title)+'</strong><p>'+esc(x.body)+'</p></div>').join("")+'</div>':"";
 const canSave=state.photo&&state.identity.client&&state.clientConfirmed&&(state.identity.variety||expectedVariety())&&state.identity.kind&&expectedCode();
 root.innerHTML=clientChooser()+traceBuilder()+status+detailsView()+issues+
  correctionPanel()+'<section class="vl2-closeout"><label class="vl2-checked"><input id="vl2-verified" type="checkbox" '+(state.reviewed?"checked":"")+'><span>Conferi a etiqueta com o modelo aprovado e a ordem de produção.</span></label>'+
  '<textarea id="vl2-notes" rows="2" placeholder="Observação (opcional)">'+esc(state.notes)+'</textarea>'+
  '<button type="button" class="vl2-save" id="vl2-save" '+(!canSave||state.saved?"disabled":"")+'>'+(state.saved?"Conferência já salva":"Salvar conferência")+'</button></section>';
 el("vl2-client-search")?.addEventListener("input",e=>{
  const t=norm(e.target.value);root.querySelectorAll("[data-vl2-client]").forEach(b=>b.hidden=!b.dataset.label.includes(t));
 });
 root.querySelectorAll("[data-vl2-client]").forEach(b=>b.addEventListener("click",()=>{
  state.identity.client=b.dataset.vl2Client;state.clientConfirmed=true;showResult();
 }));
 root.querySelectorAll("[data-vl2-trace]").forEach(inp=>inp.addEventListener("change",e=>{
  const key=e.target.dataset.vl2Trace;
  let value=e.target.value;
  if(key==="area")value=digits(value).slice(0,5);
  state.expected[key]=value;
  if(key==="area")e.target.value=value;
  if(!state.identity.variety&&key==="variety")state.identity.variety=expectedVariety();
  showResult();
 }));
 root.querySelectorAll("[data-vl2-identity]").forEach(input=>input.addEventListener("change",e=>{
  state.identity[e.target.dataset.vl2Identity]=e.target.value;showResult();
 }));
 root.querySelectorAll("[data-vl2-field]").forEach(input=>input.addEventListener("change",e=>{
  state.fields[e.target.dataset.vl2Field]=e.target.value.trim();state.sources[e.target.dataset.vl2Field]="Corrigido manualmente";showResult();
 }));
 el("vl2-verified")?.addEventListener("change",e=>state.reviewed=e.target.checked);
 el("vl2-notes")?.addEventListener("input",e=>state.notes=e.target.value);
 el("vl2-save")?.addEventListener("click",saveReview);
}
async function fetchHistory(){
 if(!ctx?.canAccess?.())return;
 const pane=el("vl2-history");if(!pane)return;
 try{
  const data=await ctx.api("history");
  state.history=Array.isArray(data.rows)?data.rows:[];
  if(!el("vl2-history"))return;
  pane.innerHTML=state.history.length?state.history.slice(0,8).map(x=>'<div class="vl2-history-row"><div><strong>'+esc(nameOf(clients,x.client))+'</strong><small>'+esc(nameOf(varieties,x.variety))+' · '+esc(nameOf(kinds,x.label_kind))+'</small></div><span>'+esc(ctx.stamp(x.created_at))+'</span></div>').join(""):'<p>Nenhuma conferência registrada.</p>';
 }catch{pane.textContent="Não foi possível carregar o histórico.";}
}
async function saveReview(){
 if(!ctx?.canAccess?.()||state.saved)return;
 if(!state.photo||!state.identity.client||!state.clientConfirmed||!state.identity.kind||!(state.identity.variety||expectedVariety())||!expectedCode()){
  notice("Confirme o cliente e complete a rastreabilidade. Se a foto estiver ilegível, corrija o tipo de etiqueta ou a variedade em ajustes.",true);return;
 }
 const btn=el("vl2-save");if(btn)btn.disabled=true;
 const issues=computeIssues(),hasAlert=issues.some(x=>x.type==="atencao"),hasPending=issues.some(x=>x.type==="confirmar");
 const status=hasAlert?"atencao":state.reviewed&&!hasPending&&state.fields.barcode&&eanValid(state.fields.barcode)&&state.sources.barcode!=="Corrigido manualmente"?"conferido":"pendente";
 const fields={...state.fields,expectedRastreio:expectedCode(),clientConfirmed:state.clientConfirmed,
  sources:state.sources,barcodeMatched:state.matches.length>0,producerReference:state.detected?.producer?.[0]||""};
 const payload={client:state.identity.client,variety:state.identity.variety||expectedVariety(),
  label_kind:state.identity.kind,label_class:state.identity.klass||"",packaging:nameOf(kinds,state.identity.kind),
  review_status:status,detected_text:state.text.slice(0,12000),fields,
  checklist:issues.map(x=>[x.type==="atencao"?"atencao":"pendente",x.title,x.body]),
  notes:state.notes||""};
 const form=new FormData();form.append("action","save");form.append("payload",JSON.stringify(payload));form.append("photo",state.photo,state.photo.name);
 try{
  notice("Salvando a foto recortada e a conferência no histórico…");
  const out=await ctx.api("save",form);
  state.saved=true;showResult();await fetchHistory();
  notice(out.pattern_learned?"Conferência registrada. Padrão validado incluído no catálogo.":"Conferência registrada. Nenhum dado do estoque foi alterado.");
 }catch(e){notice(e?.message||"Falha ao salvar conferência.",true);if(btn?.isConnected)btn.disabled=false;}
}
function bindFrame(){
 const frame=el("vl2-frame"),stage=el("vl2-stage");if(!frame||!stage)return;
 let drag=null;
 frame.addEventListener("pointerdown",e=>{
  if(state.mode!=="camera"&&state.mode!=="crop")return;
  drag={x:e.clientX,y:e.clientY,cx:state.crop.cx,cy:state.crop.cy};
  frame.setPointerCapture(e.pointerId);e.preventDefault();
 });
 frame.addEventListener("pointermove",e=>{
  if(!drag)return;
  state.crop.cx=Math.max(0,Math.min(1,drag.cx+(e.clientX-drag.x)/stage.clientWidth));
  state.crop.cy=Math.max(0,Math.min(1,drag.cy+(e.clientY-drag.y)/stage.clientHeight));
  drawCrop();
 });
 frame.addEventListener("pointerup",()=>drag=null);
 frame.addEventListener("pointercancel",()=>drag=null);
 window.removeEventListener("resize",drawCrop);
 window.addEventListener("resize",drawCrop,{passive:true});
}
function mount(adapter){
 ctx=adapter;if(!ctx?.canAccess?.())return;
 releasePhoto();resetScan();
 const p=el("panel");if(!p)return;
 p.innerHTML='<section class="vl2" aria-label="Conferência de etiquetas">'+
  '<header class="vl2-header"><div><span class="vl2-kicker">CONTROLE DE QUALIDADE <i>TESTE ADMINISTRATIVO</i></span><h2>Conferência de etiquetas</h2><p>Fotografe uma etiqueta, confirme o cliente e compare a rastreabilidade.</p></div><button id="vl2-back" class="vl2-back" type="button">Voltar ao painel</button></header>'+
  '<div class="vl2-grid"><section class="vl2-capture"><div class="vl2-section-title"><span>01</span><div><h3>Uma etiqueta por foto</h3><p>Centralize o rótulo no quadro. O restante será descartado.</p></div></div>'+
  '<div class="vl2-photo" id="vl2-stage"><div class="vl2-photo-empty" id="vl2-empty"><strong>Enquadre a etiqueta</strong><small>Use a câmera traseira ou escolha uma foto salva.</small></div><video id="vl2-video" autoplay playsinline muted hidden></video><img id="vl2-image" alt="Etiqueta recortada" hidden><div id="vl2-frame" class="vl2-frame" hidden><span>ÁREA DE LEITURA</span></div></div>'+
  '<div id="vl2-crop-tools" class="vl2-crop-tools" hidden><div><button id="vl2-square" type="button">Quadrado</button><button id="vl2-rectangle" class="active" type="button">Retangular</button></div><label>Área do recorte<input id="vl2-zoom" type="range" min="55" max="97" value="85"></label></div>'+
  '<div class="vl2-actions"><button id="vl2-open-camera" type="button" class="vl2-snap">Abrir câmera traseira</button><label class="vl2-gallery">Escolher foto<input id="vl2-gallery" type="file" accept="image/jpeg,image/png,image/webp"></label></div>'+
  '<button id="vl2-capture" type="button" class="vl2-apply" hidden>Capturar somente a área marcada</button>'+
  '<button id="vl2-apply-crop" type="button" class="vl2-apply" hidden>Recortar e analisar etiqueta</button>'+
  '<div id="vl2-progress" class="vl2-progress" hidden>Reconhecendo dados…</div><div id="vl2-notice" class="vl2-notice" hidden></div>'+
  '<p class="vl2-photo-foot">A foto é analisada após o recorte. O reconhecimento pode falhar com reflexos, letras pequenas ou imagens desfocadas.</p></section>'+
  '<section class="vl2-result"><div class="vl2-section-title"><span>02</span><div><h3>Dados e conferência</h3><p>Somente cliente e rastreabilidade precisam de confirmação habitual.</p></div></div><div id="vl2-results"></div></section></div>'+
  '<section class="vl2-recent"><h3>Conferências recentes</h3><div id="vl2-history">Carregando histórico…</div></section>'+
  '<p class="vl2-foot">Teste restrito ao administrador. Verificações dependem da qualidade da foto e das regras disponíveis para o cliente. Nenhum resultado é aprovado apenas por OCR.</p></section>';
 el("vl2-back")?.addEventListener("click",()=>{releasePhoto();ctx.back();});
 el("vl2-open-camera")?.addEventListener("click",beginCamera);
 el("vl2-gallery")?.addEventListener("change",e=>{const file=e.target.files?.[0];e.target.value="";if(file)useFile(file);});
 el("vl2-capture")?.addEventListener("click",captureCamera);
 el("vl2-apply-crop")?.addEventListener("click",finishCrop);
 el("vl2-square")?.addEventListener("click",()=>{state.crop.ratio=1;el("vl2-square").classList.add("active");el("vl2-rectangle").classList.remove("active");drawCrop();});
 el("vl2-rectangle")?.addEventListener("click",()=>{state.crop.ratio=1.5;el("vl2-rectangle").classList.add("active");el("vl2-square").classList.remove("active");drawCrop();});
 el("vl2-zoom")?.addEventListener("input",e=>{state.crop.scale=Number(e.target.value)/100;drawCrop();});
 bindFrame();showResult();loadPatterns();fetchHistory();
}
window.VITRA_LABEL_SMART={mount,catalogCount:catalog.length,reference:"DOC.CQ.056"};
})();