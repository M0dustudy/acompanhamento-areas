/* VITRA — leitura e identificação assistida de etiquetas (piloto admin).
   Referência: DOC.CQ.056, 12/09/2026, pp. 2–5, 10–33 e 39–42.
   Não presume conformidade visual nem transforma uma leitura OCR em aprovação. */
(function(){
"use strict";
const catalog=[{"barcode":"7898941149994","client":"caco","product":"Uva Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898366000542","client":"docemel","product":"Uva verde sem semente","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898366000429","client":"docemel","product":"Uva vermelha sem semente","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366001754","client":"docemel","product":"Uva Vitória","variety":"vitoria","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898366000481","client":"docemel","product":"Uva Midnight","variety":"midnight","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898366000412","client":"docemel","product":"Uva Benitaka","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366000504","client":"docemel","product":"Uva Red Globe","variety":"redglobe","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366001358","client":"docemel","product":"Cinta Dahora · Vitória","variety":"vitoria","color":"negra","weight":"250","klass":"","kind":"cinta250"},{"barcode":"7898366002898","client":"docemel","product":"Cinta Pick&Nick · uva verde","variety":"","color":"branca","weight":"250","klass":"","kind":"cinta250"},{"barcode":"7898366003604","client":"docemel","product":"Cinta Pick&Nick · uva verde","variety":"","color":"branca","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366003598","client":"docemel","product":"Cinta Pick&Nick · uva vermelha","variety":"","color":"vermelha","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366003611","client":"docemel","product":"Cinta Pick&Nick · Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366000542","client":"trielo","product":"Uva verde sem semente","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898366000429","client":"trielo","product":"Uva vermelha sem semente","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366001754","client":"trielo","product":"Uva Vitória","variety":"vitoria","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898366000481","client":"trielo","product":"Uva Midnight","variety":"midnight","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898366000412","client":"trielo","product":"Uva Benitaka","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366000504","client":"trielo","product":"Uva Red Globe","variety":"redglobe","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898366001358","client":"trielo","product":"Cinta Dahora · Vitória","variety":"vitoria","color":"negra","weight":"250","klass":"","kind":"cinta250"},{"barcode":"7898366002898","client":"trielo","product":"Cinta Pick&Nick · uva verde","variety":"","color":"branca","weight":"250","klass":"","kind":"cinta250"},{"barcode":"7898366003604","client":"trielo","product":"Cinta Pick&Nick · uva verde","variety":"","color":"branca","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366003598","client":"trielo","product":"Cinta Pick&Nick · uva vermelha","variety":"","color":"vermelha","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898366003611","client":"trielo","product":"Cinta Pick&Nick · Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"","kind":"cinta500"},{"barcode":"7898906610095","client":"debrand","product":"Uva Thompson","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7898906610217","client":"debrand","product":"Uva Crimson","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898906610149","client":"debrand","product":"Uva Red Globe","variety":"redglobe","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898906610279","client":"debrand","product":"Uva Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7898906610101","client":"debrand","product":"Uva Benitaka","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898906610262","client":"debrand","product":"Uva mista","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"0751320764195","client":"tt","product":"Uva Núbia / Jubilee","variety":"nubia","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"0751320764140","client":"tt","product":"Uva mista","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"0751320764133","client":"tt","product":"Uva Thompson","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"0609963080076","client":"tt","product":"Uva verde","variety":"","color":"branca","weight":"250","klass":"","kind":""},{"barcode":"0751320764102","client":"tt","product":"Uva black sem semente / Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7898954999197","client":"tt","product":"Uva Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"0751320764126","client":"tt","product":"Uva Crimson / Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898923868974","client":"assai","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"assai","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"assai","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868974","client":"paguemenos","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"paguemenos","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"paguemenos","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868974","client":"casaavenida","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"casaavenida","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"casaavenida","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868974","client":"gmap","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"gmap","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"gmap","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868974","client":"condor","product":"Uva clara sem semente / Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868981","client":"condor","product":"Uva preta sem semente / Vitória","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868998","client":"condor","product":"Uva vermelha sem semente / Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898923868172","client":"paguemenos","product":"Uva preta com semente / Sweet Jubilee","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868172","client":"casaavenida","product":"Uva preta com semente / Sweet Jubilee","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868172","client":"gmap","product":"Uva preta com semente / Sweet Jubilee","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868172","client":"condor","product":"Uva preta com semente / Sweet Jubilee","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868325","client":"mambo","product":"Uva preta sem semente","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898923868301","client":"mambo","product":"Uva clara sem semente / S. Crisp","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898923868318","client":"mambo","product":"Uva vermelha sem semente / C. Crush","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898746820432","client":"patrulha","product":"Uva preta","variety":"","color":"negra","weight":"250","klass":"","kind":""},{"barcode":"7898746820425","client":"patrulha","product":"Uva branca","variety":"","color":"branca","weight":"250","klass":"","kind":""},{"barcode":"7898746820449","client":"patrulha","product":"Uva vermelha","variety":"","color":"vermelha","weight":"250","klass":"","kind":""},{"barcode":"7898746820395","client":"patrulha","product":"Uva preta","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7898746820371","client":"patrulha","product":"Uva branca","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7898746820456","client":"patrulha","product":"Uva vermelha","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7898746820401","client":"patrulha","product":"Uva mista branca/preta","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"7898746820418","client":"patrulha","product":"Uva mista branca/vermelha","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"7898968700079","client":"sangiuseppe","product":"Uva mista","variety":"mista","color":"mista","weight":"","klass":"","kind":""},{"barcode":"7898968700031","client":"sangiuseppe","product":"Uva Thompson","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898968700024","client":"sangiuseppe","product":"Uva Crimson","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898968700000","client":"sangiuseppe","product":"Uva Vitória","variety":"vitoria","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7898968700055","client":"sangiuseppe","product":"Uva Rubi","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898968700086","client":"sangiuseppe","product":"Uva Benitaka","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898968700017","client":"sangiuseppe","product":"Uva Niagara","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898968700048","client":"sangiuseppe","product":"Uva Itália","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898968700062","client":"sangiuseppe","product":"Uva Ísis","variety":"isis","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7895000334674","client":"cia","product":"Qualitá · vermelha sem semente","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7898948102077","client":"cia","product":"Qualitá · clara sem semente","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7895000365241","client":"cia","product":"Qualitá · preta sem semente","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7895000356096","client":"cia","product":"Qualitá · mista sem semente","variety":"mista","color":"mista","weight":"","klass":"","kind":""},{"barcode":"7895000356089","client":"cia","product":"Qualitá · Itália","variety":"","color":"branca","weight":"","klass":"","kind":""},{"barcode":"7898901796893","client":"cia","product":"Qualitá · Benitaka","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7895000356102","client":"cia","product":"Qualitá · mista com semente","variety":"mista","color":"mista","weight":"","klass":"","kind":""},{"barcode":"7895000356072","client":"cia","product":"Qualitá · vermelha com semente","variety":"","color":"vermelha","weight":"","klass":"","kind":""},{"barcode":"7895000334698","client":"cia","product":"Qualitá · preta com semente","variety":"","color":"negra","weight":"","klass":"","kind":""},{"barcode":"7891103206894","client":"carrefour","product":"Carrefour Mercado · clara sem semente","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7891103206900","client":"carrefour","product":"Carrefour Mercado · vermelha sem semente","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7891103206924","client":"carrefour","product":"Carrefour Mercado · preta sem semente","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206979","client":"carrefour","product":"Carrefour Mercado · preta especial","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206931","client":"carrefour","product":"Carrefour Mercado · preta com semente","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206917","client":"carrefour","product":"Carrefour Mercado · vermelha com semente","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7891103206870","client":"sq","product":"Carrefour S&Q · clara especial","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7891103206740","client":"sq","product":"Carrefour S&Q · clara sem semente","variety":"","color":"branca","weight":"500","klass":"","kind":""},{"barcode":"7891103206771","client":"sq","product":"Carrefour S&Q · preta sem semente","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206887","client":"sq","product":"Carrefour S&Q · preta especial","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103206757","client":"sq","product":"Carrefour S&Q · vermelha sem semente","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7891103206764","client":"sq","product":"Carrefour S&Q · vermelha com semente","variety":"","color":"vermelha","weight":"500","klass":"","kind":""},{"barcode":"7891103206788","client":"sq","product":"Carrefour S&Q · preta com semente","variety":"","color":"negra","weight":"500","klass":"","kind":""},{"barcode":"7891103524776","client":"sq","product":"Carrefour S&Q · mista sem semente","variety":"mista","color":"mista","weight":"500","klass":"","kind":""},{"barcode":"7891103206849","client":"sq","product":"Carrefour S&Q · clara sem semente","variety":"","color":"branca","weight":"250","klass":"","kind":""},{"barcode":"7891103206863","client":"sq","product":"Carrefour S&Q · preta sem semente","variety":"","color":"negra","weight":"250","klass":"","kind":""},{"barcode":"7891103206856","client":"sq","product":"Carrefour S&Q · vermelha sem semente","variety":"","color":"vermelha","weight":"250","klass":"","kind":""},{"barcode":"7898923868424","client":"expofrut","product":"Algodão Doce","variety":"","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868592","client":"expofrut","product":"Algodão Doce","variety":"","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868127","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868295","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868585","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868639","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868653","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868042","client":"expofrut","product":"ARRA 15","variety":"arra15","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868578","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868646","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868851","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868875","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868882","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868936","client":"expofrut","product":"Autumn Crisp","variety":"autumn","color":"branca","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868066","client":"expofrut","product":"Black Seedless","variety":"","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868912","client":"expofrut","product":"Black Seedless","variety":"","color":"negra","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868455","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868547","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868554","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868561","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868615","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868813","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868950","client":"expofrut","product":"Cherry Crush","variety":"cherry","color":"vermelha","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868202","client":"expofrut","product":"Clara sem semente","variety":"","color":"branca","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868301","client":"expofrut","product":"Clara sem semente","variety":"","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868974","client":"expofrut","product":"Clara sem semente","variety":"","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868707","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868714","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868721","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868738","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868790","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"500","klass":"Sabor","kind":""},{"barcode":"7898923868806","client":"expofrut","product":"Ísis","variety":"isis","color":"vermelha","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868899","client":"expofrut","product":"Itum 9","variety":"itum9","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868905","client":"expofrut","product":"Itum 9","variety":"itum9","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868929","client":"expofrut","product":"Itum 9","variety":"itum9","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868660","client":"expofrut","product":"Melodia","variety":"melodia","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868677","client":"expofrut","product":"Melodia","variety":"melodia","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868684","client":"expofrut","product":"Melodia","variety":"melodia","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868691","client":"expofrut","product":"Melodia","variety":"melodia","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868356","client":"expofrut","product":"Midnight Beauty","variety":"midnight","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868363","client":"expofrut","product":"Midnight Beauty","variety":"midnight","color":"negra","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868073","client":"expofrut","product":"Midnight Beauty","variety":"midnight","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868097","client":"expofrut","product":"Midnight Beauty","variety":"midnight","color":"negra","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868165","client":"expofrut","product":"Mista","variety":"mista","color":"mista","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868370","client":"expofrut","product":"Mista","variety":"mista","color":"mista","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868417","client":"expofrut","product":"Mista","variety":"mista","color":"mista","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868820","client":"expofrut","product":"Núbia","variety":"nubia","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868837","client":"expofrut","product":"Núbia","variety":"nubia","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868844","client":"expofrut","product":"Núbia","variety":"nubia","color":"negra","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868172","client":"expofrut","product":"Preta com semente","variety":"","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868400","client":"expofrut","product":"Preta sem semente","variety":"","color":"negra","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868325","client":"expofrut","product":"Preta sem semente","variety":"","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868981","client":"expofrut","product":"Preta sem semente","variety":"","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868387","client":"expofrut","product":"Red Globe","variety":"redglobe","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868394","client":"expofrut","product":"Red Globe","variety":"redglobe","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868080","client":"expofrut","product":"Red Globe","variety":"redglobe","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868608","client":"expofrut","product":"Red Seedless","variety":"","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868523","client":"expofrut","product":"Red Seedless","variety":"","color":"vermelha","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868103","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"500","klass":"Extra","kind":""},{"barcode":"7898923868431","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868622","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868035","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868059","client":"expofrut","product":"Scarlotta","variety":"scarlotta","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868134","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868189","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868462","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868240","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868257","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868349","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868448","client":"expofrut","product":"Sugar Crisp","variety":"sugar","color":"branca","weight":"500","klass":"Sabor","kind":""},{"barcode":"7898923868110","client":"expofrut","product":"Sweet Globe","variety":"sweet","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868479","client":"expofrut","product":"Sweet Globe","variety":"sweet","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868486","client":"expofrut","product":"Sweet Globe","variety":"sweet","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868493","client":"expofrut","product":"Sweet Globe","variety":"sweet","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868264","client":"expofrut","product":"Thompson","variety":"","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868271","client":"expofrut","product":"Thompson","variety":"","color":"branca","weight":"500","klass":"Extra","kind":""},{"barcode":"7898923868509","client":"expofrut","product":"Thompson","variety":"","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868028","client":"expofrut","product":"Thompson","variety":"","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868745","client":"expofrut","product":"Timpson","variety":"timpson","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868752","client":"expofrut","product":"Timpson","variety":"timpson","color":"branca","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868769","client":"expofrut","product":"Timpson","variety":"timpson","color":"branca","weight":"500","klass":"Selecionada","kind":""},{"barcode":"7898923868776","client":"expofrut","product":"Timpson","variety":"timpson","color":"branca","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868332","client":"expofrut","product":"Vermelha sem semente","variety":"","color":"vermelha","weight":"400","klass":"Campesita","kind":""},{"barcode":"7898923868318","client":"expofrut","product":"Vermelha sem semente","variety":"","color":"vermelha","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868998","client":"expofrut","product":"Vermelha sem semente","variety":"","color":"vermelha","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868158","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868196","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Campesita","kind":""},{"barcode":"7898923868226","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Extra","kind":""},{"barcode":"7898923868233","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"250","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868967","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868530","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"250","klass":"Campesita","kind":""},{"barcode":"7898923868219","client":"expofrut","product":"Vitória","variety":"vitoria","color":"negra","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868011","client":"expofrut","product":"White Seedless","variety":"","color":"branca","weight":"500","klass":"Exportação","kind":""},{"barcode":"7898923868141","client":"expofrut","product":"White Seedless","variety":"","color":"branca","weight":"500","klass":"Happy Tree / Extra A","kind":""},{"barcode":"7898923868516","client":"expofrut","product":"White Seedless","variety":"","color":"branca","weight":"500","klass":"Selecionada","kind":""}];
const clients=[["expofrut","Expofrut / Novo Rumo",["EXPOFRUT","NOVO RUMO"]],["caco","CACO",["CACO"]],["docemel","Doce Mel",["DOCE MEL","PICK NICK","PICK&NICK","DAHORA"]],["trielo","Trielo",["TRIELO"]],["debrand","Comércio de Frutas Debrand",["DEBRAND"]],["tt","T&T",["T&T"]],["assai","Assaí / Bratrade",["ASSAI","ASSAÍ","BRATRADE"]],["paguemenos","Pague Menos",["PAGUE MENOS"]],["casaavenida","Casa Avenida",["CASA AVENIDA"]],["gmap","GMAP",["GMAP"]],["condor","Condor",["CONDOR"]],["mambo","Mambo",["MAMBO"]],["patrulha","Patrulha Canina",["PATRULHA CANINA"]],["sangiuseppe","San Giuseppe",["SAN GIUSEPPE"]],["potiguara","Potiguara",["POTIGUARA"]],["cia","CIA PA / Qualitá",["QUALITA","QUALITÁ","CIA PA"]],["carrefour","Carrefour Mercado",["CARREFOUR MERCADO","CARREFOUR EXPO"]],["sq","Carrefour S&Q",["S&Q"]],["outro","Outro cliente / modelo aprovado",[]]], varieties=[["arra15","ARRA 15 / ARRA Sweeties","AR",["ARRA 15","ARRA SWEETIES"]],["sugar","Sugar Crisp / IFG Eleven","SR",["SUGAR CRISP","IFG ELEVEN"]],["autumn","Autumn Crisp","AC",["AUTUMN CRISP","SUGRATHIRTYFIVE"]],["sweet","Sweet Globe / IFG Ten","SG",["SWEET GLOBE","IFG TEN"]],["timpson","Timpson / Sheegene 2","TI",["TIMPSON","SHEEGENE 2"]],["vitoria","BRS Vitória","VI",["BRS VITORIA","BRS VITÓRIA","UVA VITORIA","UVA VITÓRIA"]],["melodia","BRS Melodia","ME",["BRS MELODIA","MELODIA"]],["nubia","BRS Núbia","NB",["NUBIA","NÚBIA"]],["isis","BRS Ísis","IS",["BRS ISIS","BRS ÍSIS","UVA ISIS"]],["midnight","Midnight Beauty","MB",["MIDNIGHT BEAUTY","MIDNIGHT"]],["scarlotta","Scarlotta Seedless","SC",["SCARLOTTA","SUGRANINETEEN"]],["itum9","Itum 9","I9",["ITUM 9","ITUMN NINE"]],["cherry","ARRA Cherry Crush","ACR",["CHERRY CRUSH","ARRA CHERRY"]],["redglobe","Red Globe","RG",["RED GLOBE"]],["mista","Uva mista","",["UVA MISTA"]]], kinds=[["caixa","Etiqueta de caixa"],["cumbuca","Cumbuca · peso a confirmar"],["cumbuca500","Cumbuca 500 g"],["cumbuca250","Cumbuca 250 g"],["cinta500","Cinta 500 g"],["cinta250","Cinta 250 g"],["selo","Selo / etiqueta de data"],["sacola","Sacola"],["exportacao","Exportação"],["outro","Outro modelo"]];
const classes=["Campesita","Happy Tree / Extra A","Extra","Sacola","Selecionada","Sabor","Exportação","Outra"];

/* Conferência por foto — interface isolada do piloto administrativo. */
// Entidades institucionais são consultadas somente no cadastro privado autenticado.
const producers=[];
const sortedClients=clients.slice().sort((a,b)=>a[1].localeCompare(b[1],"pt-BR",{sensitivity:"base"}));
const state={
 photo:null,url:null,sourceFile:null,sourceUrl:null,text:"",barcode:"",detected:null,
 identity:{client:"",kind:"",variety:"",klass:""},clientConfirmed:false,
 expected:{year:String(new Date().getFullYear()).slice(-2),area:"",valve:"",day:"",month:"",method:"",variety:""},
 fields:{},sources:{},issues:[],matches:[],history:[],notes:"",reviewed:false,saved:false,
 mode:"empty",crop:{cx:.5,cy:.5,scale:.85,ratio:1.5},processing:false,sequence:0,
 entities:[],refsLoaded:false,catalogLoaded:false,diag:null,detailId:null,photoAspect:0,scanCompleted:false,ocrFailed:false,reviewRequested:false,kindConfirmed:false
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
 state.fields={};state.sources={};state.issues=[];state.matches=[];state.referenceChecks=[];state.referenceProducer=null;state.referenceMerchant=null;state.diag=null;state.reviewed=false;state.saved=false;
 state.identity={client:"",kind:"",variety:"",klass:""};state.clientConfirmed=false;
 state.expected={year:String(new Date().getFullYear()).slice(-2),area:"",valve:"",day:"",month:"",method:"",variety:""};
 state.notes="";state.mode="empty";state.photoAspect=0;state.scanCompleted=false;state.ocrFailed=false;state.reviewRequested=false;state.kindConfirmed=false;
}
function validCnpj(raw){
 const n=digits(raw);if(n.length!==14||/^(\d)\1+$/.test(n))return false;
 const check=(limit)=>{let sum=0,weight=limit-7;for(let i=0;i<limit;i++){sum+=Number(n[i])*weight--;if(weight<2)weight=9;}let v=sum%11;return v<2?0:11-v;};
 return check(12)===Number(n[12])&&check(13)===Number(n[13]);
}
function parseTrace(value){
 const m=norm(value).replace(/[–—]/g,"-").replace(/\s/g,"").match(/^R-(\d{2})-([0-9A-Z_./]{1,40})-(\d{2})(\d{2})-([C58])-([A-Z0-9]{2,5})$/);
 return m?{year:m[1],areaValve:m[2],area:"",valve:"",day:m[3],month:m[4],method:m[5],variety:m[6]}:null;
}
function expectedCode(){
 const x=state.expected;
 if(!x.year||!x.area||!x.valve||!x.day||!x.month||!x.method||!x.variety)return "";
 return "R-"+x.year+"-"+norm(x.area).replace(/[^A-Z0-9_./]/g,"")+norm(x.valve).replace(/[^A-Z0-9_./]/g,"")+"-"+x.day+x.month+"-"+x.method+"-"+x.variety;
}
function expectedVariety(){
 return varieties.find(x=>x[2]===state.expected.variety)?.[0]||"";
}
function getEAN(raw){
 const plain=str(raw).replace(/(?:GGN|GLOBALGAP|GLOBAL G A P)\s*:?\s*(\d[\d\s-]{11,20})/gi," ");
 const codes=(plain.match(/(?<!\d)(?:\d[\s-]*){13}(?!\d)/g)||[]).map(digits);
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
 const traceMatch=str(raw).match(/\bR[\s\-–—]*(\d{2})[\s\-–—]*([0-9A-Za-z_./]{2,40})[\s\-–—]*(\d{4})[\s\-–—]*([C58])[\s\-–—]*([A-Za-z0-9]{2,5})\b/i);
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
 const boxEvidence=!!printedCnpj||!!printedGgn||/\b(?:PRODUZIDO POR|COMERCIALIZADO POR|GGN|GLN|CNPJ)\b/.test(n)||(/\bCAIXA\b|\b(?:5|8)\s*KG\b/.test(n)&&!explicitCumbuca);
 const wG=/\b250\s*G\b/.test(n)?"250":/\b500\s*G\b/.test(n)?"500":/^\d{3} G$/i.test(peso)?digits(peso):"";
 const catalogKind=distinct(group.map(x=>x.kind));
 if(explicitCinta&&wG)kind="cinta"+wG;
 else if(explicitCumbuca&&wG)kind="cumbuca"+wG;
 else if(boxEvidence)kind="caixa";
 else if(/\bSELO\b/.test(n))kind="selo";
 else if(catalogKind.length===1&&catalogKind[0])kind=catalogKind[0];
 else if(wG&&b&&!printedCnpj&&!printedGgn)kind="cumbuca"+wG;
 else if(!boxEvidence&&b&&state.photoAspect>0&&state.photoAspect<1.72)kind=wG?"cumbuca"+wG:"cumbuca";
 else if(boxEvidence&&state.photoAspect>1.25)kind="caixa";
 const shapeSuggestion=Boolean(kind&&!boxEvidence&&!explicitCumbuca&&!explicitCinta&&!catalogKind.some(Boolean)&&!/\bSELO\b/.test(n));
 // Códigos 20/21 identificam a embalagem, mas não comprovam o tamanho físico da etiqueta.
 const dateMatch=str(raw).match(/\b([0-3]?\d)[.\/-]([01]?\d)[.\/-]((?:20)?\d{2})\b/);
 const date=dateMatch?dateMatch[1].padStart(2,"0")+"/"+dateMatch[2].padStart(2,"0")+"/"+(dateMatch[3].length===2?"20"+dateMatch[3]:dateMatch[3]):track?track.day+"/"+track.month+"/20"+track.year:"";
 const lot=str(raw).match(/\b(?:LOTE|LOT)\s*[:#-]?\s*([0-9A-Z./-]{2,24})\b/i)?.[1]||"";
 const cnpjPattern=/\bCNPJ\s*[:#-]?\s*([0-9][0-9.\/ \t-]{10,25})/gi;
 const candidates=[...str(raw).matchAll(cnpjPattern)].map(x=>digits(x[1]));
 const producedSection=str(raw).split(/PRODUZIDO POR/i)[1]?.split(/COMERCIALIZADO POR|RASTREABILIDADE/i)[0]||"";
 const companySection=str(raw).split(/COMERCIALIZADO POR/i)[1]?.split(/PRODUZIDO POR|RASTREABILIDADE/i)[0]||"";
 const producerCnpj=digits(producedSection.match(cnpjPattern)?.[0]||"");
 const companyCnpj=digits(companySection.match(cnpjPattern)?.[0]||"");
 const cnpj=producerCnpj||(candidates.length===1&&!companySection?candidates[0]:"");
 const ggn=str(raw).match(/\b(?:GGN|GLOBALGAP|GLOBAL\s*G\.?A\.?P\.?)\s*[:#-]?\s*([0-9][0-9 \t-]{10,20})/i)?.[1]||"";
 const ggnNumber=digits(ggn);
 const producer=producers.find(p=>producedSection&&norm(producedSection).includes(norm(p[0])))||producers.find(p=>p[1]&&digits(cnpj)===p[1])||producers.find(p=>p[2]&&ggnNumber===p[2])||(!companySection?producers.find(p=>n.includes(norm(p[0]))):null)||null;
 const commer=producers.find(p=>companySection&&norm(companySection).includes(norm(p[0])))||null;
 const refWeight=classCode?classCode[3]==="50"?"5 kg":classCode[3]==="80"?"8 kg":"":"";
 return {
  detectedClient:foundClient,codeClients:candidateClients,wordClients:words,identity:{kind,variety,klass},
  fields:{barcode:b,rastreio:trace,data:date,lote:lot,peso,produto:group.length===1?group[0].product:"",cnpj:cnpj?digits(cnpj):"",cnpjComercial:companyCnpj,ggn:ggnNumber,produtor:producer?.[0]||"",comercializado:commer?.[0]||""},
  sources:{barcode:b?"Foto / código de barras":"",rastreio:trace?"Foto":"",peso:weightPhoto?"Foto":weightCatalog?"Catálogo":"",data:dateMatch?"Foto":track?"Código de rastreabilidade":"",cnpj:cnpj?"Foto":"",ggn:ggnNumber?"Foto":"",produto:group.length===1?"Catálogo":""},
  producer,commer,weightPhoto,weightCatalog,refWeight,packedKindCode:classCode?.[5]||"",track,printedDate:dateMatch?date:"",matches,barcodeClients:candidateClients,clientAmbiguous:candidateClients.length>1&&agreed.length!==1,kindConfidence:shapeSuggestion?"low":"high"
 };
}
function registryAudit(){
 const out=[],f=state.fields,rows=state.entities;
 const add=(type,title,body,reference="DOC.CQ.056")=>out.push({type,title,body,reference});
 if(!state.photo)return {rows:out,producer:null,merchant:null};
 if(!state.refsLoaded){add("confirmar","Base de produtores","Consulta privada indisponível; não foi possível comparar GGN, CNPJ e endereços.");return {rows:out,producer:null,merchant:null};}
 const full=state.text||"";
 const part=(pattern,stop)=>full.match(pattern)?.[1]?.split(stop)[0]||"";
 const produced=part(/(?:PRODUZIDO\s+POR|PRODUTOR)\s*[:\-]?\s*([\s\S]*)/i,/COMERCIALIZADO\s+POR|RASTREABILIDADE|C[ÓO]DIGO\s+DE\s+BARRAS/i);
 const marketed=part(/COMERCIALIZADO\s+POR\s*[:\-]?\s*([\s\S]*)/i,/PRODUZIDO\s+POR|RASTREABILIDADE/i);
 const entityName=(fragment,e)=>{
  if(!fragment)return false;
  const clean=v=>norm(v).replace(/[^A-Z0-9_./]/g,"");
  const needle=clean(e.name),hay=clean(fragment);
  return needle.length>=10&&hay.includes(needle);
 };
 const producers=rows.filter(x=>x.kind==="producer");
 const merchants=rows.filter(x=>x.kind==="commercial"||x.kind==="producer");
 const sameGGN=digits(f.ggn)?producers.filter(p=>p.ggn===digits(f.ggn)):[];
 const sameCNPJ=digits(f.cnpj)?producers.filter(p=>p.cnpj===digits(f.cnpj)):[];
 const named=produced?producers.filter(e=>entityName(produced,e)):[];
 const choose=(set)=>set.length===1?set[0]:null;
 const producer=choose(sameCNPJ)||choose(named)||choose(sameGGN)||null;
 const ref=e=>"DOC.CQ.056, p. "+e.source_page;
 const compare=(key,label,read,expected,entity)=>{
  if(!expected)return;
  if(!read){add("confirmar",label,"Referência de "+entity.name+" conhecida, mas o número não foi lido para comparar.",ref(entity));return;}
  if(digits(read)===digits(expected))add("ok",label,entity.name+" · "+digits(read)+" confere com a referência.",ref(entity));
  else add("atencao",label,"Lido: "+digits(read)+" · cadastrado para "+entity.name+": "+digits(expected)+". Confira o número impresso.",ref(entity));
 };
 if(!f.ggn&&/\bGGN\b/i.test(full))add("confirmar","GGN","O identificador aparece na etiqueta, mas os 13 dígitos não foram reconhecidos.");
 if(f.ggn){
  if(sameGGN.length>1&&!choose(named)&&!choose(sameCNPJ))add("confirmar","GGN compartilhado","O mesmo GGN está associado a "+sameGGN.map(x=>x.name).join(" / ")+". A numeração sozinha não identifica um produtor exclusivo.");
  else if(!sameGGN.length&&!producer)add("confirmar","GGN sem referência","O número "+digits(f.ggn)+" não consta nos registros atualmente disponíveis; não foi considerado incorreto por ausência de cadastro.");
  else if(producer?.ggn)compare("ggn","GGN do produtor",f.ggn,producer.ggn,producer);
 }
 if(!f.cnpj&&/\bCNPJ\b/i.test(produced))add("confirmar","CNPJ do produtor","O documento menciona CNPJ, mas não foi possível ler o número completo.");
 if(f.cnpj){
  if(producer?.cnpj)compare("cnpj","CNPJ do produtor",f.cnpj,producer.cnpj,producer);
  else if(sameCNPJ.length===1)add("ok","CNPJ do produtor","Número reconhecido para "+sameCNPJ[0].name+".",ref(sameCNPJ[0]));
  else if(!sameCNPJ.length)add("confirmar","CNPJ do produtor","Número lido, mas o cadastro consultado não permite confirmar o titular.");
 }
 if(producer){
  add("ok","Produtor identificado",producer.name+" (referência documental).",ref(producer));
  if(f.ggn&&producer.ggn&&producer.ggn!==digits(f.ggn)&&sameGGN.length>0)add("atencao","Produtor e GGN","O GGN encontrado pertence a outra referência, diferente do produtor identificado pelo CNPJ ou nome.",ref(producer));
 }
 const merchantByCnpj=digits(f.cnpjComercial)?merchants.filter(e=>e.cnpj===digits(f.cnpjComercial)):[];
 const namedMerchant=marketed?merchants.filter(e=>entityName(marketed,e)):[];
 const merchant=choose(merchantByCnpj)||choose(namedMerchant)||null;
 if(f.cnpjComercial){
  if(merchant?.cnpj)compare("cnpjComercial","CNPJ do comerciante",f.cnpjComercial,merchant.cnpj,merchant);
  else add("confirmar","CNPJ do comerciante","Número lido, mas não foi possível confirmar a empresa responsável na base.");
 }
 if(merchant)add("ok","Comercializado por",merchant.name+" · endereço cadastrado: "+(merchant.address||"sem endereço"),ref(merchant));
 const cep=v=>digits((str(v).match(/(?:CEP)\s*[:\-]?\s*(\d{5}[-\s]?\d{3})/i)||[])[1]||"");
 for(const [label,partText,entity] of [["CEP do produtor",produced,producer],["CEP do comerciante",marketed,merchant]]){
  const read=cep(partText),reference=entity?cep(entity.address):"";
  if(!reference||!read)continue;
  add(read===reference?"ok":"atencao",label,read===reference?"CEP "+read+" confere com o endereço de "+entity.name+".":"Lido: "+read+" · referência de "+entity.name+": "+reference+".",ref(entity));
 }
 const cities=["CASA NOVA","PETROLINA","JUAZEIRO","IBIAPINA","SANTA MARIA DA BOA VISTA"];
 for(const [label,block,entity] of [["Endereço do produtor",produced,producer],["Endereço do comerciante",marketed,merchant]]){
  if(!entity?.address||!block)continue;
  const expectedCity=cities.find(x=>norm(entity.address).includes(x));
  const readCities=cities.filter(x=>norm(block).includes(x));
  if(expectedCity&&readCities.length===1){
   add(readCities[0]===expectedCity?"ok":"atencao",label,
   readCities[0]===expectedCity?"Município impresso coincide com "+entity.name+".":"Município lido: "+readCities[0]+"; cadastro de "+entity.name+": "+expectedCity+".",ref(entity));
  }else if(/(?:ENDERECO|ENDEREÇO|END:|CEP:)/i.test(block)&&!cep(block)){
   add("confirmar",label,"Endereço presente, mas sem leitura confiável para comparação.",ref(entity));
  }
 }
 const normalizeAddress=v=>norm(v)
  .replace(/\bBR\s*[-–]?\s*(\d{2,3})/g,"BR $1")
  .replace(/\bKM\s*[-–]?\s*(\d+)/g,"KM $1")
  .replace(/[^A-Z0-9]+/g," ").replace(/\s+/g," ").trim();
 for(const [title,printed,entity] of [["Endereço completo do produtor",produced,producer],["Endereço completo do comerciante",marketed,merchant]]){
  if(!entity?.address)continue;
  const expected=normalizeAddress(entity.address),actual=normalizeAddress(printed);
  const normalizedStop=new Set(["DE","DO","DA","DAS","DOS","NO","NA","EM","S","N","END","ENDERECO","BRASIL","CEP"]);
  const tokens=distinct(expected.split(" ").filter(x=>x.length>=3&&!normalizedStop.has(x)));
  const common=tokens.filter(x=>actual.split(" ").includes(x));
  const targetNums=distinct(expected.split(" ").filter(x=>/^\d{2,}$/.test(x)));
  const shownNums=actual.split(" ");
  const matchedNums=targetNums.every(x=>shownNums.includes(x));
  if(!printed||!/(?:END|ENDERECO|CEP|RUA|RODOVIA|BR|LOTE|PROJETO|FAZENDA)/i.test(norm(printed))){
   add("confirmar",title,"O endereço não foi reconhecido integralmente na foto para comparação com o cadastro.",ref(entity));continue;
  }
  if(matchedNums&&tokens.length>=3&&common.length/tokens.length>=.8){
   add("ok",title,"Endereço impresso compatível com a referência de "+entity.name+".",ref(entity));
  }else{
   const postal=cep(printed),known=cep(entity.address);
   if(postal&&known&&postal!==known)add("atencao",title,"CEP impresso "+postal+" difere de "+known+" no cadastro de "+entity.name+".",ref(entity));
   else add("confirmar",title,"O endereço não pôde ser conferido por completo. Confira rua/rodovia, número ou lote, localidade e CEP de "+entity.name+".",ref(entity));
  }
 }
 return {rows:out,producer,merchant};
}
function computeIssues(){
 const out=[],add=(type,title,body)=>out.push([type,title,body]);
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
 if(f.cnpj&&!validCnpj(f.cnpj))add("atencao","CNPJ","O CNPJ do produtor está incorreto: quantidade de dígitos ou verificadores não conferem.");
 if(f.cnpjComercial&&!validCnpj(f.cnpjComercial))add("atencao","CNPJ do comerciante","A numeração comercial não passou na validação.");
 if(f.ggn&&digits(f.ggn).length!==13)add("atencao","GGN","Foram lidos "+digits(f.ggn).length+" dígitos; a referência do manual utiliza 13. Confira dígitos extras ou ausentes.");
 if(/\bCNPJ\b/i.test(state.text)&&!f.cnpj&&!f.cnpjComercial)add("confirmar","CNPJ ilegível","Há referência a CNPJ na etiqueta, mas nenhum número foi identificado com segurança.");
 if(/\bGGN\b/i.test(state.text)&&!f.ggn)add("confirmar","GGN ilegível","Há referência a GGN, mas o número não foi recuperado com segurança.");
 if(!state.refsLoaded&&detected?.producer?.[1]&&f.cnpj&&f.cnpj!==detected.producer[1])add("atencao","CNPJ do produtor","O CNPJ reconhecido difere do cadastro de "+detected.producer[0]+" no DOC.CQ.056.");
 // A validação do CNPJ comercial já foi realizada acima.
 if(!state.refsLoaded&&detected?.commer?.[1]&&f.cnpjComercial&&f.cnpjComercial!==detected.commer[1])add("atencao","CNPJ do comerciante","CNPJ impresso diferente da referência para "+detected.commer[0]+".");
 if(!state.refsLoaded&&detected?.producer?.[2]&&f.ggn&&f.ggn!==detected.producer[2])add("atencao","GGN do produtor","O GGN reconhecido difere da referência de "+detected.producer[0]+" no DOC.CQ.056.");
 if(!state.refsLoaded&&(f.cnpj||f.ggn)&&!detected?.producer)add("confirmar","Cadastro do produtor","Identificação numérica detectada, mas não foi possível associá-la com segurança a um produtor do manual.");
 const relevantMatches=state.matches.filter(m=>m.client===chosen);
 const uniqueClass=distinct(relevantMatches.map(m=>m.klass));
 if(state.identity.klass&&uniqueClass.length===1&&uniqueClass[0]!==state.identity.klass)add("atencao","Classificação","A classe impressa difere do padrão cadastrado para o código e cliente selecionados.");
 if(!state.text&&!state.barcode)add("confirmar","Imagem","Nenhuma informação legível foi reconhecida. Fotografe novamente com melhor iluminação.");
 const registry=registryAudit();state.referenceChecks=registry.rows;state.referenceProducer=registry.producer;state.referenceMerchant=registry.merchant;
 for(const item of registry.rows)if(item.type!=="ok")out.push([item.type,item.title,item.body]); 
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
  state.catalogLoaded=true;
 }catch{state.catalogLoaded=false;notice("Catálogo complementar temporariamente indisponível. A consulta local continua ativa.",true);}
 if(state.photo)showResult();
}
async function loadEntities(){
 if(!ctx?.canAccess?.())return;
 try{const response=await ctx.api("references");state.entities=Array.isArray(response.rows)?response.rows:[];state.refsLoaded=state.entities.length>0;}
 catch{state.entities=[];state.refsLoaded=false;notice("Base privada de produtores indisponível; dados institucionais não serão aprovados automaticamente.",true);}
 if(state.photo)showResult();
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
 state.photoAspect=canvas.width/canvas.height;
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
async function enhanceForOCR(file){
 let bitmap=null;
 try{
  bitmap=await createImageBitmap(file);
  const width=Math.min(2800,Math.max(1500,bitmap.width));
  const height=Math.round(bitmap.height*width/bitmap.width);
  if(height>3800)throw Error("Imagem excessivamente alta");
  const canvas=document.createElement("canvas");
  canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext("2d",{willReadFrequently:true});
  ctx.fillStyle="#fff";ctx.fillRect(0,0,width,height);
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";
  ctx.filter="contrast(1.4) brightness(1.11) saturate(0)";
  ctx.drawImage(bitmap,0,0,width,height);
  return canvas;
 }catch{return null;}finally{bitmap?.close?.();}
}
function ocrEvidenceScore(value){
 const text=norm(value);let score=Math.min(200,text.length)/20;
 if(/\bR-\d{2}-[A-Z0-9./_]+-\d{4}-[C58]-[A-Z0-9]{2,5}\b/.test(text))score+=30;
 if(/\bCNPJ\b/.test(text))score+=7;
 if(/\bGGN\b/.test(text))score+=7;
 if(/\b(?:EMBALADO|EMBALAGEM|DATA)\b/.test(text))score+=4;
 if(varieties.some(v=>v[3].some(a=>text.includes(norm(a)))))score+=12;
 if(getEAN(text))score+=20;
 return score;
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
   if(ocrEvidenceScore(recognized)<30&&seq===state.sequence){
     if(progress)progress.textContent="Aprimorando a leitura de caracteres e números pequenos…";
     const sharpened=await enhanceForOCR(state.photo);
     if(sharpened){
       const alternative=str((await worker.recognize(sharpened)).data?.text).trim();
       if(ocrEvidenceScore(alternative)>ocrEvidenceScore(recognized))recognized=alternative;
     }
   }
  }catch{failed=true;}
  if(seq!==state.sequence||!ctx?.canAccess?.())return;
  const data=extract(recognized,barcode);
  state.text=recognized;state.barcode=barcode||data.fields.barcode;state.detected=data;
  state.fields=data.fields;state.sources=data.sources;state.matches=data.matches;
  // Uma escolha explícita feita antes da foto nunca é substituída pelo OCR.
  if(!state.clientConfirmed)state.identity.client=data.detectedClient;
  state.identity.kind=data.identity.kind;state.identity.variety=data.identity.variety;state.identity.klass=data.identity.klass;
  state.ocrFailed=failed;state.scanCompleted=true;state.issues=[];showResult();
  if(el("vl2-results")&&window.innerWidth<1000)el("vl2-results").scrollIntoView({behavior:"smooth",block:"start"});
  notice(failed?"Leitura parcial. Confira a imagem e corrija os campos que não foram identificados.":"Etiqueta analisada. Informe as referências de produção para concluir a comparação.",failed);
 }finally{
  try{await worker?.terminate();}catch{}
  if(progress)progress.hidden=true;
 }
}
function clientChooser(){
 const active=state.identity.client;
 return '<div class="vl2-client-wrap"><div class="vl2-control-label">Cliente <small>seleção obrigatória</small></div>'+
  '<details name="vl2-choice" class="vl2-client-combo" id="vl2-client-combo"><summary><span class="vl2-search-icon" aria-hidden="true">⌕</span><strong>'+esc(active?nameOf(clients,active):"Pesquisar ou selecionar cliente")+'</strong><em>'+esc(state.clientConfirmed?"Alterar":"Confirmar")+'</em></summary>'+
  '<div class="vl2-client-pop"><div class="vl2-popup-header"><strong>Selecionar cliente</strong><button type="button" data-vl2-close-lookup aria-label="Fechar seleção">✕</button></div><input id="vl2-client-search" type="search" autocomplete="off" aria-label="Pesquisar cliente" placeholder="Digite o nome do cliente…"><div class="vl2-client-options">'+
  sortedClients.map(c=>'<button type="button" data-vl2-client="'+esc(c[0])+'" data-label="'+esc(norm(c[1]))+'">'+esc(c[1])+'</button>').join("")+
  '</div></div></details><p class="vl2-help">'+(state.clientConfirmed?"Cliente confirmado. Você pode alterá-lo a qualquer momento.":active?"Identificação sugerida pela foto; toque para confirmar.":"Escolha o cliente para cruzar com a etiqueta.")+'</p></div>';
}
function lookupPicker(items,key,value,placeholder,attribute){
 const ordered=items.slice().sort((a,b)=>a[1].localeCompare(b[1],"pt-BR",{numeric:true,sensitivity:"base"}));
 const selected=ordered.find(x=>x[0]===value),attr=attribute==="trace"?"data-vl2-option-trace":"data-vl2-option-identity";
 const list=ordered.map(x=>'<button type="button" '+attr+'="'+esc(key)+'" data-pick-value="'+esc(x[0])+'" data-pick-label="'+esc(norm(x[1]))+'"'+(x[0]===value?' aria-current="true"':'')+'>'+esc(x[1])+'</button>').join("");
 return '<details name="vl2-choice" class="vl2-lookup"><summary><span class="vl2-search-icon" aria-hidden="true">⌕</span><span>'+esc(selected?selected[1]:placeholder)+'</span><b aria-hidden="true">⌄</b></summary><div class="vl2-lookup-pop"><div class="vl2-popup-header"><strong>'+esc(placeholder)+'</strong><button type="button" data-vl2-close-lookup aria-label="Fechar opções">✕</button></div><input type="search" data-vl2-search-choice autocomplete="off" placeholder="Pesquisar opção…" aria-label="Pesquisar '+esc(placeholder)+'"><div class="vl2-lookup-list">'+list+'</div></div></details>';
}
function traceOptions(items,key,placeholder){return lookupPicker(items,key,state.expected[key],placeholder,"trace");}
function traceBuilder(){
 const year=Number(new Date().getFullYear());
 const years=Array.from({length:11},(_,i)=>{const y=String(year-5+i).slice(-2);return [y,String(year-5+i)];});
 const day=Array.from({length:31},(_,i)=>[String(i+1).padStart(2,"0"),String(i+1).padStart(2,"0")]);
 const month=Array.from({length:12},(_,i)=>[String(i+1).padStart(2,"0"),String(i+1).padStart(2,"0")]);
 const letters=["A","B","C","D","1","2","3","4"].map(x=>[x,x]);
 const varietiesCodes=varieties.filter(x=>x[2]).slice().sort((a,b)=>a[1].localeCompare(b[1],"pt-BR")).map(x=>[x[2],x[2]+" · "+x[1]]);
 const siteAreas=(()=>{try{return typeof A==="object"&&A?Object.keys(A).map(digits).filter(x=>x.length>=3&&x.length<=5):[];}catch{return [];}})();
 const expected=expectedCode(),observed=state.fields.rastreio||"";
 const same=expected&&observed&&norm(expected)===norm(observed);
 const status=expected?(observed?(same?"Conferida: códigos correspondem":"Divergência com a foto"):"Referência completa; aguardando leitura da foto"):"Selecione os campos da produção";
 return '<section class="vl2-trace" aria-label="Rastreabilidade de referência"><div class="vl2-trace-title"><strong>Rastreabilidade</strong><span>Conferência obrigatória</span></div>'+
  '<p>Informe a rastreabilidade real da produção. O código lido na foto será comparado separadamente.</p>'+
  '<div class="vl2-trace-grid">'+
  '<label>Prefixo<input readonly value="R" aria-label="Prefixo R"></label>'+
  '<div class="vl2-trace-field"><span>Ano</span>'+traceOptions(years,"year","Ano")+'</div>'+
  '<label class="vl2-trace-area">Área<input data-vl2-trace="area" maxlength="20" list="vl2-areas" value="'+esc(state.expected.area)+'" placeholder="Código do produtor"><datalist id="vl2-areas">'+distinct([...siteAreas,state.detected?.track?.area,...(state.history||[]).map(x=>parseTrace(x?.fields?.rastreio||"")?.area)]).filter(Boolean).map(x=>'<option value="'+esc(x)+'"></option>').join("")+'</datalist></label>'+
  '<label>Válvula'+'<input data-vl2-trace="valve" maxlength="16" list="vl2-valves" value="'+esc(state.expected.valve)+'" placeholder="Letra ou número"><datalist id="vl2-valves">'+letters.map(x=>'<option value="'+x[0]+'"></option>').join("")+'</datalist>'+'</label>'+
  '<div class="vl2-trace-field"><span>Dia</span>'+traceOptions(day,"day","Dia")+'</div>'+
  '<div class="vl2-trace-field"><span>Mês</span>'+traceOptions(month,"month","Mês")+'</div>'+
  '<div class="vl2-trace-field"><span>Pesagem</span>'+traceOptions([["C","C · Contentor"],["5","5 · Caixa 5 kg"],["8","8 · Caixa 8 kg"]],"method","Método")+'</div>'+
  '<div class="vl2-trace-field"><span>Variedade</span>'+traceOptions(varietiesCodes,"variety","Sigla")+'</div></div>'+
  '<div class="vl2-trace-compare"><div><small>Na fotografia</small><strong>'+esc(observed||"Não identificado")+'</strong></div><div><small>Referência informada</small><strong>'+esc(expected||"Preenchimento incompleto")+'</strong></div></div>'+
  '<div class="vl2-reference-hint">Confira os valores corretos da ordem de produção antes da comparação.</div></section>';
}
function fact(label,value,source){
 return '<div class="vl2-fact"><small>'+esc(label)+'</small><strong>'+esc(value||"Não identificado")+'</strong>'+(source?'<span>'+esc(source)+'</span>':"")+'</div>';
}
function category(){
 const k=state.identity.kind;
 return ["caixa","sacola","exportacao"].includes(k)?"box":["cumbuca","cumbuca500","cumbuca250","cinta500","cinta250"].includes(k)?"unit":"other";
}
function detailsView(){
 const k=state.identity.kind,v=state.identity.variety,f=state.fields,src=state.sources;
 if(!state.photo)return '<div class="vl2-start"><strong>Fotografe uma única etiqueta</strong><p>O VITRA identifica o modelo, lê os dados impressos e cruza o que foi reconhecido com o manual e os padrões cadastrados.</p></div>';
 let facts=fact("Tipo de etiqueta",nameOf(kinds,k),k?"Reconhecido · alterável em ajustes":"Não foi possível identificar com segurança")+
  fact("Variedade",nameOf(varieties,v),v?"Rastreabilidade / texto / catálogo":"A confirmar")+
  fact("Classificação",state.identity.klass,"Identificada quando disponível");
 if(category()==="box"){
  facts+=fact("Peso da caixa",f.peso,src.peso)+fact("Lote",f.lote,src.lote)+
    fact("Produtor",state.referenceProducer?.name||f.produtor,state.referenceProducer?"Identificação na base privada":"Foto / referência")+
    fact("Endereço do produtor",state.referenceProducer?.address||"","DOC.CQ.056, conforme cadastro")+
    fact("CNPJ do produtor",f.cnpj,src.cnpj)+fact("GGN",f.ggn,src.ggn)+
    fact("Comercializado por",state.referenceMerchant?.name||f.comercializado,src.comercializado)+
    fact("Endereço comercial",state.referenceMerchant?.address||"","DOC.CQ.056, conforme cadastro")+
    fact("CNPJ comercial",f.cnpjComercial,src.cnpjComercial)+
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
  '<div class="vl2-correction-grid"><div class="vl2-option-field"><span>Tipo reconhecido</span>'+lookupPicker(kinds,"kind",state.identity.kind,"Não identificado","identity")+'</div>'+
  '<div class="vl2-option-field"><span>Variedade reconhecida</span>'+lookupPicker(varieties,"variety",state.identity.variety,"Não identificada","identity")+'</div>'+
  '<div class="vl2-option-field"><span>Classificação reconhecida</span>'+lookupPicker(classes.map(x=>[x,x]),"klass",state.identity.klass,"Não identificada","identity")+'</div></div>'+
  '<p class="vl2-refine-hint">Os dados abaixo são extraídos da foto. Corrija apenas erros de leitura; não é necessário preenchê-los para realizar a conferência.</p>'+
  '<div class="vl2-correction-grid">'+[["rastreio","Rastreabilidade lida"],["peso","Peso"],["barcode","EAN"],["data","Data"],["lote","Lote"],["produtor","Produtor"],["cnpj","CNPJ do produtor"],["cnpjComercial","CNPJ comercial"],["ggn","GGN"],["produto","Produto"]].map(x=>
    '<label>'+esc(x[1])+'<input data-vl2-field="'+x[0]+'" value="'+esc(state.fields[x[0]]||"")+'"></label>').join("")+'</div>'+
  '<details class="vl2-raw"><summary>Texto bruto extraído</summary><pre>'+esc(state.text||"Sem leitura")+'</pre></details></details>';
}
function diagnose(){
 const issues=computeIssues(),additional=[],f=state.fields,client=state.identity.client,expected=expectedCode(),model=state.identity.kind;
 const add=(type,title,body)=>additional.push({type,title,body});
 if(state.photo){
  if(!state.catalogLoaded)add("confirmar","Catálogo","Não foi possível consultar os padrões confirmados no banco de dados.");
  if(!f.barcode)add("confirmar","Código de barras","Não reconhecido; o cliente e o modelo não podem ser confirmados pelo EAN.");
  else if(!eanValid(f.barcode)){} // já sinalizado pelo validador
  else{
   const matched=state.matches.filter(x=>x.client===client);
   if(!matched.length)add("confirmar","Modelo do cliente","O código de barras não está vinculado ao cliente escolhido nas referências disponíveis. Pode exigir autorização de uso do código da fazenda.");
   else if(matched.length&&state.detected?.codeClients?.length>1&&!state.detected?.wordClients?.includes(client))add("confirmar","Cliente pelo código","EAN utilizado por mais de um cliente; a marca precisa ser confirmada na própria etiqueta.");
  }
  if(!state.identity.variety)add("confirmar","Variedade","Não foi possível confirmar a variedade por texto, sigla ou referência comercial.");
  if(model==="caixa"&&!state.identity.klass)add("confirmar","Classificação","A classe da caixa não foi identificada na foto nem no modelo do cliente.");
  if(model==="caixa"&&!f.ggn&&!f.cnpj)add("confirmar","Identificação do produtor","CNPJ ou GGN não foram reconhecidos; não é possível validar dados fixos do produtor.");
  if(/\b(?:LOTE|LOT)\b/i.test(state.text)&&!f.lote)add("confirmar","Lote","A palavra lote aparece na etiqueta, mas o número não foi recuperado.");
  if(!expected||!f.rastreio){} // o validador já registra a pendência
  if(["barcode","rastreio","cnpj","cnpjComercial","ggn"].some(key=>state.sources[key]==="Corrigido manualmente"))add("confirmar","Leitura retificada","Foi corrigido manualmente um identificador. Confira o número na foto antes de validar.");
 }
 const all=issues.concat(additional.map(x=>[x.type,x.title,x.body]));
 const errors=all.filter(x=>x[0]==="atencao"),pending=all.filter(x=>x[0]==="confirmar");
 const checks=[
  ...all.map(x=>({status:x[0]==="atencao"?"error":"pending",title:x[1],detail:x[2]})),
  ...(state.referenceChecks||[]).filter(x=>x.type==="ok").map(x=>({status:"ok",title:x.title,detail:x.body,reference:x.reference}))
 ];
 if(state.photo){
  if(f.barcode&&eanValid(f.barcode)&&state.matches.some(x=>x.client===client))checks.push({status:"ok",title:"Código de barras",detail:"EAN-13 validado e localizado na referência do cliente."});
  if(expected&&f.rastreio&&norm(expected)===norm(f.rastreio))checks.push({status:"ok",title:"Rastreabilidade",detail:"Código informado corresponde à sequência lida na etiqueta."});
  if(model)checks.push({status:"ok",title:"Tipo identificado",detail:nameOf(kinds,model)+" identificado na imagem ou no catálogo; confirme o aspecto do modelo."});
 }
 const status=!state.photo?"inicial":errors.length?"reprovado":pending.length?"pendente":"aprovado";
 const summary=status==="reprovado"
  ?errors.length+" divergência(s) detectada(s). "+errors.slice(0,2).map(x=>x[1]).join(" e ")+". Confira os itens antes de utilizar a etiqueta."
  :status==="pendente"?"A leitura ainda não permite validar todos os dados exigidos. "+pending.length+" item(ns) precisam de confirmação."
  :status==="aprovado"?"Os dados reconhecidos coincidem com as referências consultadas. A aplicação física e a ordem de produção ainda exigem conferência.":"Posicione uma única etiqueta na câmera para iniciar o diagnóstico.";
 return {status,summary,checks,errors:errors.length,pending:pending.length,ok:checks.filter(x=>x.status==="ok").length,referenceComplete:status==="aprovado"&&state.refsLoaded&&state.catalogLoaded};
}
function diagnosticV4(){
 const checks=[],f=state.fields||{},kind=state.identity.kind,unit=category()==="unit",box=category()==="box";
 const add=(status,title,detail,reference="")=>checks.push({status,title,detail,reference});
 const selected=state.identity.client,display=nameOf(clients,selected),matches=catalog.filter(x=>f.barcode&&x.barcode===digits(f.barcode));
 const owners=distinct(matches.map(x=>x.client));
 const ownerNames=owners.map(k=>nameOf(clients,k)).sort((a,b)=>a.localeCompare(b,"pt-BR"));
 const expected=expectedCode(),printed=f.rastreio||"",trace=parseTrace(printed);
 const scanned=Boolean(state.scanCompleted&&state.photo);
 if(!scanned)return {status:"inicial",ready:false,checks:[],errors:0,pending:0,ok:0,summary:""};
 if(!state.clientConfirmed||!selected)add("pending","Cliente","Confirme o cliente da ordem de produção para comparar o EAN da fotografia.");
 if(!expected)add("pending","Rastreabilidade de referência","Informe o código correto da ordem de produção. O VITRA vai comparar com o código impresso, sem copiar um para o outro.");
 if(!kind)add("pending","Tipo de etiqueta","Não foi possível identificar o modelo com segurança. Selecione o tipo em Ajustar leitura.");
 if(kind&&state.detected?.kindConfidence==="low"&&!state.kindConfirmed)add("pending","Modelo sugerido pela forma","O formato da imagem sugere "+nameOf(kinds,kind)+", mas não há dados suficientes para diferenciar cumbuca e caixa com segurança. Confirme o modelo antes de aprovar.");
 if(category()==="other")add("pending","Modelo da etiqueta","O modelo informado não é identificado como etiqueta de caixa ou de cumbuca; exige uma regra específica de validação.");
 if(f.barcode){
  if(!eanValid(f.barcode))add("error","Código de barras","EAN lido: "+f.barcode+". Dígito verificador inválido; confira os 13 números.");
  else if(!matches.length)add("pending","EAN não catalogado","EAN-13 "+f.barcode+" válido, mas ausente das referências cadastradas. É necessária a confirmação do padrão autorizado.");
  else if(selected&&state.clientConfirmed&&!owners.includes(selected))add("error","EAN de outro cliente","EAN-13 "+f.barcode+" está cadastrado para: "+ownerNames.join(", ")+". Não há vínculo desse código com "+display+" na base consultada. Confira o cliente e eventual autorização de uso do código da fazenda.");
  else if(selected&&state.clientConfirmed){
   add("ok","EAN e cliente","EAN-13 "+f.barcode+" corresponde ao cadastro de "+display+(owners.length>1?". Este mesmo número também consta para "+ownerNames.join(" e ")+".":"."),"DOC.CQ.056 · códigos por cliente");
  }
 }else add("pending","Código de barras","Os 13 dígitos não foram reconhecidos. Refaça a fotografia ou revise o campo lido.");
 if(printed){
  if(!trace)add("error","Formato de rastreabilidade","O código impresso "+printed+" não segue o formato R-ANO-ÁREA/VÁLVULA-DDMM-MÉTODO-SIGLA.");
  else if(!varieties.some(v=>v[2]===trace.variety))add("pending","Sigla desconhecida","A sigla '"+trace.variety+"' não foi encontrada no glossário; confira a impressão e a referência atualizada do produtor.");
  if(expected){
   if(norm(expected).replace(/\s/g,"")!==norm(printed).replace(/\s/g,""))
    add("error","Rastreabilidade divergente","Etiqueta: "+printed+" · ordem de produção: "+expected+".","DOC.CQ.056, pp. 2–3, 7");
   else add("ok","Rastreabilidade","O código impresso confere integralmente com a ordem de produção: "+expected+".");
  }
 }else add("pending","Rastreabilidade não reconhecida","O código não foi lido na etiqueta; não é possível conferir a sequência da produção.");
 const photoVar=state.detected?.identity?.variety||"",referenceVar=expectedVariety();
 const printedVar=trace?varieties.find(v=>v[2]===trace.variety)?.[0]||"":"";
 if(photoVar&&printedVar&&photoVar!==printedVar)
   add("error","Variedade e sigla","O nome da uva identificado na etiqueta é "+nameOf(varieties,photoVar)+", mas a rastreabilidade termina em "+trace.variety+" ("+nameOf(varieties,printedVar)+").");
 else if(photoVar&&printedVar)add("ok","Variedade e sigla",nameOf(varieties,photoVar)+" corresponde à sigla "+trace.variety+" no manual.","DOC.CQ.056, p. 5");
 else if(photoVar)add("ok","Variedade identificada",nameOf(varieties,photoVar)+" reconhecida no texto da etiqueta.");
 else if(printedVar)add("ok","Sigla reconhecida",trace.variety+" corresponde a "+nameOf(varieties,printedVar)+" no manual.");
 else add("pending","Variedade","Não foi possível confirmar nome e sigla da uva na fotografia.");
 if(referenceVar&&((photoVar&&photoVar!==referenceVar)||(printedVar&&printedVar!==referenceVar)))
   add("error","Variedade da ordem de produção","A referência exige "+nameOf(varieties,referenceVar)+", mas a sigla impressa corresponde a "+nameOf(varieties,printedVar||photoVar)+".");
 const validateDate=(d,m,y)=>{const dt=new Date(Number(y),Number(m)-1,Number(d));return dt.getFullYear()===Number(y)&&dt.getMonth()===Number(m)-1&&dt.getDate()===Number(d);};
 if(trace){
  const year=2000+Number(trace.year);
  if(!validateDate(trace.day,trace.month,year))add("error","Data codificada","Dia e mês inválidos no código de rastreabilidade: "+trace.day+"/"+trace.month+"/"+year+".");
 }
 const datePhoto=state.detected?.printedDate||"";
 if(datePhoto){
  const dd=datePhoto.split("/");
  if(dd.length===3&&!validateDate(dd[0],dd[1],dd[2]))add("error","Data de embalagem","A data impressa "+datePhoto+" não é válida.");
  else if(trace&&datePhoto!==trace.day+"/"+trace.month+"/20"+trace.year)add("error","Data divergente","Data impressa: "+datePhoto+" · data na rastreabilidade: "+trace.day+"/"+trace.month+"/20"+trace.year+".");
  else if(trace)add("ok","Data","A data "+datePhoto+" coincide com a data codificada na rastreabilidade.");
 }else if(unit)add("pending","Data impressa","A data de embalagem não foi lida separadamente. O dia e o mês do código não comprovam, por si sós, que a data impressa está correta.");
 if(unit){
  const weights=distinct(matches.filter(x=>!selected||x.client===selected).map(x=>x.weight));
  const expectation=kind.includes("250")?"250":kind.includes("500")?"500":weights.length===1?weights[0]:"";
  if(expectation&&state.detected?.weightPhoto){
    const observed=digits(state.detected.weightPhoto);
    if(observed!==expectation)add("error","Peso da cumbuca","Etiqueta: "+state.detected.weightPhoto+" · modelo: "+expectation+" g.");
    else add("ok","Peso da unidade","Peso impresso confere com "+expectation+" g.");
  }else if(!expectation)add("pending","Peso / modelo da cumbuca","Peso da cumbuca não pôde ser confirmado. Confira 250 g ou 500 g conforme o modelo aprovado.");
 }
 if(box){
  if(!state.identity.klass)add("pending","Classificação da caixa","Não foi possível reconhecer a classificação impressa.");
  else{
   const same=matches.filter(x=>x.client===selected);
   const classes=distinct(same.map(x=>x.klass).filter(Boolean));
   if(classes.length===1&&classes[0]!==state.identity.klass)add("error","Classificação","Etiqueta: "+state.identity.klass+" · modelo cadastrado: "+classes[0]+".");
   else add("ok","Classificação",state.identity.klass+" identificada; "+(classes.length===1?"referência consultada.":"confirmar modelo específico no padrão do cliente."));
  }
  if(!state.refsLoaded)add("pending","Cadastro institucional","A base privada de produtores está indisponível; GGN/CNPJ/endereço não podem ser validados.");
  else {
   const ref=registryAudit();state.referenceChecks=ref.rows;state.referenceProducer=ref.producer;state.referenceMerchant=ref.merchant;
   for(const row of ref.rows){
    if(row.type==="atencao")add("error",row.title,row.body,row.reference);
    else if(row.type==="confirmar")add("pending",row.title,row.body,row.reference);
    else if(row.type==="ok")add("ok",row.title,row.body,row.reference);
   }
   if(!ref.producer)add("pending","Produtor da caixa","Não foi possível vincular com segurança o produtor impresso a uma referência documental.");
  }
  if(f.cnpj&&!validCnpj(f.cnpj))add("error","CNPJ do produtor","CNPJ reconhecido: "+f.cnpj+". Confira o número completo e o dígito verificador.");
  if(f.cnpjComercial&&!validCnpj(f.cnpjComercial))add("error","CNPJ comercial","CNPJ reconhecido: "+f.cnpjComercial+". Dígito verificador não confere.");
  if(f.ggn&&digits(f.ggn).length!==13)add("error","GGN","Lidos "+digits(f.ggn).length+" dígitos; o manual registra 13.");
  if(/\bGLN\b/i.test(state.text))add("pending","GLN sem base de comparação","O manual consultado não fornece GLN de referência para essa empresa. Não é seguro aprovar esse identificador apenas por possuir 13 dígitos.");
 }
 if(state.ocrFailed||!state.text)add("pending","Qualidade da leitura","Alguns caracteres não foram reconhecidos. Melhore a iluminação, aproxime a câmera ou revise a imagem.");
 for(const k of ["barcode","rastreio","cnpj","cnpjComercial","ggn"])
  if(state.sources[k]==="Corrigido manualmente")add("pending","Identificador ajustado","O campo "+k+" foi alterado manualmente. Uma nova leitura da foto é necessária para aprovação automática.");
 const critical=checks.filter(x=>x.status==="error"),pending=checks.filter(x=>x.status==="pending");
 const ready=Boolean(state.photo&&state.scanCompleted&&state.clientConfirmed&&expected&&kind);
 const status=!ready?"coleta":critical.length?"reprovado":pending.length?"pendente":"aprovado";
 const summary=status==="coleta"?"Complete o cliente e a rastreabilidade da ordem de produção. Só depois o VITRA emitirá o resultado.":
 status==="reprovado"?"Foram identificadas "+critical.length+" divergência(s) entre a etiqueta e as referências consultadas.":
 status==="pendente"?"A imagem ou o cadastro não permitem concluir a conferência com segurança. Revise os itens pendentes.":
 "Os identificadores lidos coincidem com as referências disponíveis. O resultado digital está apto para confirmação e registro.";
 return {status,summary,checks,errors:critical.length,pending:pending.length,ok:checks.filter(x=>x.status==="ok").length,ready,referenceComplete:ready&&status==="aprovado"};
}
function showResult(){
 const root=el("vl2-results");if(!root)return;
 if(!state.photo||!state.scanCompleted){
  root.innerHTML='<div class="vl2-welcome"><strong>Comece pela fotografia</strong><p>Fotografe uma única etiqueta. Depois da leitura, confirme o cliente e a rastreabilidade correta da ordem de produção. O diagnóstico aparece após essa comparação.</p></div>';
  return;
 }
 const report=diagnosticV4();state.diag=report;
 const kind=state.identity.kind,name=nameOf(kinds,kind);
 const initial=state.detected?.identity?.variety?nameOf(varieties,state.detected.identity.variety):"Não identificada";
 const code=state.fields.barcode||"Não identificado";
 const owners=distinct(catalog.filter(x=>x.barcode===code).map(x=>x.client));
 const ownerNames=owners.map(x=>nameOf(clients,x)).sort((a,b)=>a.localeCompare(b,"pt-BR"));
 const codeContext=owners.length>1?"O mesmo EAN-13 consta para "+ownerNames.join(" e ")+". Isso não significa erro por si só.":owners.length===1?"EAN-13 associado a "+ownerNames[0]+".":"O EAN-13 ainda não foi localizado no catálogo consultado.";
 const reading='<section class="vl2-photo-reading"><div class="vl2-reading-head"><span>01</span><div><strong>Leitura da fotografia</strong><small>Identificação preliminar</small></div></div><div class="vl2-reading-facts"><div><small>Modelo</small><strong>'+esc(kind?name:"A confirmar")+'</strong></div><div><small>Uva</small><strong>'+esc(initial)+'</strong></div><div class="vl2-reading-barcode"><small>Código de barras (EAN-13 completo)</small><strong>'+esc(code)+'</strong><p>'+esc(codeContext)+'</p></div></div></section>';
 const reference='<section class="vl2-reference-section"><div class="vl2-reading-head"><span>02</span><div><strong>Dados da ordem de produção</strong><small>Informe os valores corretos, independentes da etiqueta impressa.</small></div></div>'+clientChooser()+traceBuilder()+
 ((!kind||state.detected?.kindConfidence==="low"&&!state.kindConfirmed)?'<div class="vl2-type-choice"><strong>Modelo de etiqueta</strong><p>Confirme o tipo indicado pela fotografia antes da conferência.</p>'+lookupPicker(kinds,"kind",kind,"Selecionar modelo","identity")+(kind?'<button type="button" class="vl2-confirm-kind" id="vl2-confirm-kind">Confirmar este modelo</button>':"")+'</div>':"")+'</section>';
 const visual=report.checks.slice().sort((a,b)=>({error:0,pending:1,ok:2}[a.status]-{error:0,pending:1,ok:2}[b.status]));
 const issues=visual.filter(x=>x.status!=="ok"),passed=visual.filter(x=>x.status==="ok");
 const item=x=>'<div class="vl2-check-item vl2-check-'+x.status+'"><span aria-hidden="true">'+(x.status==="ok"?"✓":x.status==="error"?"!":"?")+'</span><div><strong>'+esc(x.title)+'</strong><p>'+esc(x.detail)+'</p>'+(x.reference?'<small>'+esc(x.reference)+'</small>':"")+'</div></div>';
 let outcome="";
 if(!state.reviewRequested){
  outcome='<section class="vl2-decision-prompt"><div class="vl2-reading-head"><span>03</span><div><strong>Conferência da etiqueta</strong><small>O parecer depende das confirmações acima.</small></div></div><p>'+esc(report.ready?"As referências estão preenchidas. Compare agora com a foto.":"Complete cliente, modelo e rastreabilidade da ordem de produção para habilitar a conferência.")+'</p><button type="button" id="vl2-evaluate" class="vl2-evaluate" '+(!report.ready?"disabled":"")+'>Conferir dados da etiqueta</button></section>';
 }else{
  const title=report.status==="aprovado"?"Aprovado na conferência digital":report.status==="reprovado"?"Divergências identificadas":"Conferência inconclusiva";
  outcome='<section class="vl2-outcome" id="vl2-outcome"><div class="vl2-status vl2-status-'+report.status+'"><div><small>03 · RESULTADO</small><strong>'+esc(title)+'</strong></div><p>'+esc(report.summary)+'</p></div>'+
  '<section class="vl2-diagnostic"><div class="vl2-diagnostic-title"><strong>'+esc(issues.length?"Itens para corrigir ou confirmar":"Itens conferidos")+'</strong><small>'+report.errors+' divergências · '+report.pending+' pendências</small></div>'+
  (issues.length?'<div class="vl2-check-list">'+issues.map(item).join("")+'</div>':'<p class="vl2-approved-msg">Nenhuma divergência encontrada nos dados que puderam ser verificados.</p>')+
  (passed.length?'<details class="vl2-passed"><summary>'+passed.length+' conferência(s) com a referência</summary><div class="vl2-check-list">'+passed.map(item).join("")+'</div></details>':"")+'</section></section>';
  if(report.status==="aprovado")outcome+='<section class="vl2-closeout"><div class="vl2-reading-head"><span>04</span><div><strong>Salvar conferência</strong><small>Última etapa, após o parecer aprovado</small></div></div><label class="vl2-checked"><input id="vl2-verified" type="checkbox" '+(state.reviewed?"checked":"")+'><span>Conferi a aplicação física e o modelo da etiqueta com a ordem de produção.</span></label><textarea id="vl2-notes" rows="2" placeholder="Observação (opcional)">'+esc(state.notes)+'</textarea><button id="vl2-save" type="button" class="vl2-save" '+(!state.reviewed||state.saved?"disabled":"")+'>'+(state.saved?"Registro salvo":"Aprovar e salvar no histórico")+'</button></section>';
  else outcome+='<p class="vl2-not-ready">Há itens que impedem a aprovação. Corrija a etiqueta ou refaça a fotografia para executar uma nova conferência.</p>';
 }
 root.innerHTML=reading+reference+outcome+
 '<details class="vl2-details-root"><summary>Ver dados reconhecidos e corrigir leitura</summary><div class="vl2-details-body">'+detailsView()+correctionPanel()+'</div></details>';
 root.querySelectorAll('details[name="vl2-choice"]').forEach(d=>d.addEventListener("toggle",()=>{
  if(d.open){root.querySelectorAll('details[name="vl2-choice"]').forEach(v=>{if(v!==d)v.open=false;});d.querySelector('input[type="search"]')?.focus({preventScroll:true});}
 }));
 root.querySelectorAll("[data-vl2-close-lookup]").forEach(b=>b.addEventListener("click",()=>{b.closest("details").open=false;}));
 el("vl2-client-search")?.addEventListener("input",e=>{const q=norm(e.target.value);root.querySelectorAll("[data-vl2-client]").forEach(b=>b.hidden=!b.dataset.label.includes(q));});
 root.querySelectorAll("[data-vl2-client]").forEach(b=>b.addEventListener("click",()=>{state.identity.client=b.dataset.vl2Client;state.clientConfirmed=true;state.reviewRequested=false;showResult();}));
 root.querySelectorAll("[data-vl2-trace]").forEach(inp=>{
  const update=e=>{const key=e.target.dataset.vl2Trace;let value=e.target.value;
   if(key==="area"||key==="valve")value=norm(value).replace(/[^A-Z0-9_./]/g,"").slice(0,key==="area"?20:16);
   state.expected[key]=value;
   if(state.reviewRequested){
    state.reviewRequested=false;state.reviewed=false;
    const outcome=el("vl2-outcome"),closeout=root.querySelector(".vl2-closeout");
    if(closeout)closeout.remove();
    if(outcome){
     outcome.innerHTML='<div class="vl2-outcome-reset"><strong>Referência alterada</strong><p>O resultado anterior não é mais válido. Execute a comparação com os novos dados.</p><button type="button" id="vl2-recheck" class="vl2-evaluate">Conferir novamente</button></div>';
     el("vl2-recheck")?.addEventListener("click",()=>{if(!diagnosticV4().ready)return;state.reviewRequested=true;showResult();});
    }
   }
   const action=el("vl2-evaluate");if(action)action.disabled=!diagnosticV4().ready;
  };
  inp.addEventListener("input",update);inp.addEventListener("change",update);
 });
 root.querySelectorAll("[data-vl2-search-choice]").forEach(inp=>inp.addEventListener("input",e=>{
  const q=norm(e.target.value);e.target.closest(".vl2-lookup-pop").querySelectorAll("[data-pick-label]").forEach(b=>b.hidden=!b.dataset.pickLabel.includes(q));
 }));
 root.querySelectorAll("[data-vl2-option-trace]").forEach(b=>b.addEventListener("click",()=>{
  state.expected[b.dataset.vl2OptionTrace]=b.dataset.pickValue;state.reviewRequested=false;showResult();
 }));
 root.querySelectorAll("[data-vl2-option-identity]").forEach(b=>b.addEventListener("click",()=>{
  state.identity[b.dataset.vl2OptionIdentity]=b.dataset.pickValue;if(b.dataset.vl2OptionIdentity==="kind")state.kindConfirmed=true;state.reviewRequested=false;showResult();
 }));
 root.querySelectorAll("[data-vl2-field]").forEach(inp=>inp.addEventListener("change",e=>{
  state.fields[e.target.dataset.vl2Field]=e.target.value.trim();state.sources[e.target.dataset.vl2Field]="Corrigido manualmente";state.reviewRequested=false;showResult();
 }));
 el("vl2-confirm-kind")?.addEventListener("click",()=>{state.kindConfirmed=true;showResult();});
 el("vl2-evaluate")?.addEventListener("click",()=>{state.reviewRequested=true;showResult();el("vl2-outcome")?.scrollIntoView({behavior:"smooth",block:"start"});});
 el("vl2-verified")?.addEventListener("change",e=>{state.reviewed=e.target.checked;const btn=el("vl2-save");if(btn)btn.disabled=!state.reviewed||state.saved;});
 el("vl2-notes")?.addEventListener("input",e=>state.notes=e.target.value);
 el("vl2-save")?.addEventListener("click",saveReview);
}
function renderHistoryRows(rows,archive=false){
 return rows.map(x=>{
  const status=x.review_status==="atencao"?"Divergência":x.review_status==="conferido"?"Aprovado":"Pendente";
  return '<div class="vl2-history-line"><button class="vl2-history-entry" type="button" data-history-id="'+esc(x.id)+'">'+
   '<span class="vl2-history-dot vl2-history-'+esc(x.review_status)+'"></span>'+
   '<span class="vl2-history-main"><strong>'+esc(nameOf(clients,x.client))+'</strong><small>'+esc(nameOf(kinds,x.label_kind))+' · '+esc(nameOf(varieties,x.variety))+'</small><small>Responsável: '+esc(x.reviewer_name||"Não identificado")+'</small></span>'+
   '<span class="vl2-history-meta"><b>'+status+'</b><small>'+esc(ctx.stamp(x.created_at))+'</small></span><span class="vl2-history-arrow">›</span></button>'+
   (ctx?.isMaster?.()?'<button type="button" class="vl2-history-action" data-history-action="'+(archive?"restore":"hide")+'" data-history-target="'+esc(x.id)+'">'+(archive?"Restaurar":"Ocultar")+'</button>':"")+
   '</div>';
 }).join("");
}
function bindHistoryActions(pane){
 pane.querySelectorAll("[data-history-id]").forEach(b=>b.addEventListener("click",()=>openHistory(b.dataset.historyId)));
 pane.querySelectorAll("[data-history-action]").forEach(b=>b.addEventListener("click",async()=>{
  if(!ctx?.isMaster?.())return;
  const action=b.dataset.historyAction,id=b.dataset.historyTarget;
  const question=action==="hide"?"Ocultar esta conferência da lista? A fotografia e os dados serão preservados para auditoria e poderão ser restaurados.":"Restaurar esta conferência ao histórico?";
  if(!window.confirm(question))return;
  b.disabled=true;
  try{await ctx.api(action,{id});await fetchHistory();if(el("vl2-archive")?.open)await fetchArchived();}
  catch(e){notice(e.message||"Não foi possível alterar o histórico.",true);b.disabled=false;}
 }));
}
async function fetchHistory(){
 if(!ctx?.canAccess?.())return;
 const pane=el("vl2-history");if(!pane)return;
 try{
  const data=await ctx.api("history");state.history=Array.isArray(data.rows)?data.rows:[];
  if(!el("vl2-history"))return;
  pane.innerHTML=state.history.length?renderHistoryRows(state.history.slice(0,30)):'<p class="vl2-hint">Nenhuma conferência registrada.</p>';
  bindHistoryActions(pane);
 }catch{pane.textContent="Não foi possível carregar o histórico.";}
}
async function fetchArchived(){
 if(!ctx?.isMaster?.())return;
 const pane=el("vl2-archived-list");if(!pane)return;
 try{const response=await ctx.api("archived");const rows=Array.isArray(response.rows)?response.rows:[];
  pane.innerHTML=rows.length?renderHistoryRows(rows,true):'<p class="vl2-hint">Nenhum registro ocultado.</p>';bindHistoryActions(pane);}
 catch(e){pane.textContent=e.message||"Não foi possível carregar os registros ocultados.";}
}
async function openHistory(id){
 if(!ctx?.canAccess?.()||!/^[0-9a-f-]{36}$/i.test(id))return;
 const host=el("vl2-dialog-host");if(!host)return;
 host.innerHTML='<div class="vl2-overlay" role="dialog" aria-modal="true" aria-label="Diagnóstico registrado"><div class="vl2-dialog"><header><strong>Carregando diagnóstico…</strong><button id="vl2-close-detail" type="button" aria-label="Fechar">×</button></header></div></div>';
 const close=()=>{host.replaceChildren();};
 host.querySelector("#vl2-close-detail")?.addEventListener("click",close);
 host.querySelector(".vl2-overlay")?.addEventListener("click",e=>{if(e.target.classList.contains("vl2-overlay"))close();});
 try{
  const response=await ctx.api("detail",{id}),record=response.review;
  if(!record||!ctx?.canAccess?.()||!host.querySelector(".vl2-overlay"))return;
  let image="";
  if(record.photo_path){
   try{const signed=await ctx.api("photo_url",{id});if(signed.url&&signed.url.startsWith("https://"))image='<img class="vl2-detail-photo" src="'+esc(signed.url)+'" alt="Fotografia original desta conferência">';}
   catch{image='<p class="vl2-hint">Foto temporariamente indisponível.</p>';}
  }
  const f=record.fields||{},saved=f.diagnostic||{},checks=Array.isArray(saved.checks)?saved.checks:[];
  const status=saved.status|| (record.review_status==="conferido"?"aprovado":record.review_status==="atencao"?"reprovado":"pendente");
  const names={aprovado:record.review_status==="conferido"?"Aprovado na conferência":"Leitura sem divergências · inspeção pendente",reprovado:"Reprovado / divergência",pendente:"Pendente de confirmação"};
  const summaries=saved.summary||"Registro histórico. Consulte os itens encontrados e o texto reconhecido.";
  const items=checks.length?checks.map(x=>'<div class="vl2-check-item vl2-check-'+esc(x.status||"pending")+'"><span aria-hidden="true">'+(x.status==="ok"?"✓":x.status==="error"?"!":"?")+'</span><div><strong>'+esc(x.title)+'</strong><p>'+esc(x.detail)+'</p>'+(x.reference?'<small>'+esc(x.reference)+'</small>':"")+'</div></div>').join(""):Array.isArray(record.checklist)?record.checklist.map(x=>'<div class="vl2-check-item vl2-check-'+(x[0]==="atencao"?"error":"pending")+'"><span aria-hidden="true">?</span><div><strong>'+esc(x[1])+'</strong><p>'+esc(x[2])+'</p></div></div>').join(""):"";
  const vals=[["Cliente",nameOf(clients,record.client)],["Tipo de etiqueta",nameOf(kinds,record.label_kind)],["Variedade",nameOf(varieties,record.variety)],["Classificação",record.label_class],["Rastreabilidade lida",f.rastreio],["Rastreabilidade de referência",f.expectedRastreio],["GGN",f.ggn],["CNPJ do produtor",f.cnpj],["CNPJ comercial",f.cnpjComercial],["Produtor",f.produtor],["Lote",f.lote],["Data",f.data],["Peso",f.peso],["Código de barras",f.barcode]];
  host.innerHTML='<div class="vl2-overlay" role="dialog" aria-modal="true" aria-label="Diagnóstico registrado"><div class="vl2-dialog"><header><div><small>CONFERÊNCIA REGISTRADA · '+esc(ctx.stamp(record.created_at))+'</small><h3>Diagnóstico da etiqueta</h3></div><button id="vl2-close-detail" type="button" aria-label="Fechar">×</button></header>'+
   '<div class="vl2-detail-status vl2-status-'+esc(status)+'"><strong>'+esc(names[status]||"Registro de conferência")+'</strong><p>'+esc(summaries)+'</p><small>Responsável: '+esc(record.reviewer_name||"Não identificado")+'</small></div>'+
   (image||"")+'<div class="vl2-detail-facts">'+vals.filter(x=>x[1]).map(x=>'<div><small>'+esc(x[0])+'</small><strong>'+esc(x[1])+'</strong></div>').join("")+'</div>'+
   '<h4>Itens da conferência</h4><div class="vl2-check-list">'+(items||'<p class="vl2-hint">O relatório antigo não contém diagnóstico detalhado.</p>')+'</div>'+
   (record.notes?'<div class="vl2-detail-note"><strong>Observação registrada</strong><p>'+esc(record.notes)+'</p></div>':"")+
   '<footer>Fonte: '+esc(record.rule_version||"Referência não registrada")+' · Registro preservado no histórico.</footer></div></div>';
  host.querySelector("#vl2-close-detail")?.addEventListener("click",close);
  host.querySelector(".vl2-overlay")?.addEventListener("click",e=>{if(e.target.classList.contains("vl2-overlay"))close();});
  host.querySelector("#vl2-close-detail")?.focus();
 }catch(e){
  if(host.querySelector(".vl2-dialog"))host.querySelector(".vl2-dialog").innerHTML='<header><strong>Não foi possível abrir o diagnóstico.</strong><button id="vl2-close-detail" type="button">Fechar</button></header><p class="vl2-hint">'+esc(e.message||"Tente novamente.")+'</p>';
  host.querySelector("#vl2-close-detail")?.addEventListener("click",close);
 }
}
async function saveReview(){
 if(!ctx?.canAccess?.()||state.saved)return;
 const report=diagnosticV4();
 if(!state.reviewRequested||report.status!=="aprovado"||!report.referenceComplete||!state.reviewed){
  notice("Somente etiquetas aprovadas na conferência e confirmadas pelo responsável podem ser salvas.",true);return;
 }
 if(state.sources.barcode==="Corrigido manualmente"){notice("O EAN precisa ser reconhecido na fotografia para aprovação.",true);return;}
 const btn=el("vl2-save");if(btn)btn.disabled=true;
 const fields={...state.fields,expectedRastreio:expectedCode(),clientConfirmed:state.clientConfirmed,
  sources:state.sources,barcodeMatched:catalog.some(x=>x.client===state.identity.client&&x.barcode===state.fields.barcode),
  producerReference:state.referenceProducer?.name||"",
  diagnostic:{status:"aprovado",summary:report.summary,checks:report.checks,workflowVersion:4},
  verification:{workflowVersion:4,validated:true,referenceComplete:true,barcodeOrigin:"photo",reviewedByHuman:true}};
 const payload={client:state.identity.client,variety:state.identity.variety||state.detected?.identity?.variety||expectedVariety(),
  label_kind:state.identity.kind,label_class:category()==="box"?(state.identity.klass||""):"",
  packaging:nameOf(kinds,state.identity.kind),review_status:"conferido",
  detected_text:state.text.slice(0,12000),fields,
  checklist:report.checks.filter(x=>x.status!=="ok").map(x=>[x.status==="error"?"atencao":"pendente",x.title,x.detail]),
  notes:state.notes||""};
 const form=new FormData();form.append("action","save");form.append("payload",JSON.stringify(payload));form.append("photo",state.photo,state.photo.name);
 try{
  notice("Registrando o diagnóstico aprovado e sua fotografia…");
  const outcome=await ctx.api("save",form);state.saved=true;showResult();await fetchHistory();
  notice(outcome.pattern_learned?"Conferência aprovada e salva. Referência adicionada ao catálogo.":"Conferência aprovada e salva no histórico.");
 }catch(e){notice(e?.message||"Não foi possível salvar o diagnóstico.",true);if(btn?.isConnected)btn.disabled=false;}
}
function setCropShape(active){
 for(const name of ["vl2-square","vl2-rectangle","vl2-portrait"])el(name)?.classList.toggle("active",name===active);
}
function adjustCrop(delta){
 state.crop.scale=Math.max(.35,Math.min(.98,state.crop.scale+delta));
 if(el("vl2-zoom"))el("vl2-zoom").value=Math.round(state.crop.scale*100);
 drawCrop();
}
function bindFrame(){
 const frame=el("vl2-frame"),stage=el("vl2-stage");if(!frame||!stage)return;
 const active=new Map();let gesture=null;
 function clamp(value,lo,hi){return Math.max(lo,Math.min(hi,value));}
 function spacing(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
 function center(a,b){return {x:(a.x+b.x)/2,y:(a.y+b.y)/2};}
 frame.addEventListener("pointerdown",e=>{
  if(!["camera","crop"].includes(state.mode))return;
  const p={x:e.clientX,y:e.clientY};active.set(e.pointerId,p);
  try{frame.setPointerCapture(e.pointerId);}catch{}
  if(active.size>=2){
   const two=[...active.values()];gesture={kind:"pinch",startDistance:Math.max(20,spacing(two[0],two[1])),startScale:state.crop.scale,startCenter:center(two[0],two[1]),startCx:state.crop.cx,startCy:state.crop.cy};
  }else{
   gesture={kind:e.target.closest(".vl2-resize-grip")?"resize":"move",x:e.clientX,y:e.clientY,cx:state.crop.cx,cy:state.crop.cy,scale:state.crop.scale,ratio:state.crop.ratio,rect:frameBounds()};
  }
  e.preventDefault();
 });
 frame.addEventListener("pointermove",e=>{
  if(!active.has(e.pointerId)||!gesture)return;
  active.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(active.size>=2&&gesture.kind==="pinch"){
   const points=[...active.values()],dist=spacing(points[0],points[1]),mid=center(points[0],points[1]);
   state.crop.scale=clamp(gesture.startScale*dist/gesture.startDistance,.35,.98);
   state.crop.cx=clamp(gesture.startCx+(mid.x-gesture.startCenter.x)/stage.clientWidth,0,1);
   state.crop.cy=clamp(gesture.startCy+(mid.y-gesture.startCenter.y)/stage.clientHeight,0,1);
  }else if(active.size===1){
   const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
   if(gesture.kind==="resize"){
    const width=clamp(gesture.rect.w+dx,stage.clientWidth*.25,stage.clientWidth*.98);
    const height=clamp(gesture.rect.h+dy,stage.clientHeight*.25,stage.clientHeight*.98);
    state.crop.ratio=clamp(width/height,.45,3.25);
    state.crop.scale=clamp(Math.max(width/stage.clientWidth,height/stage.clientHeight),.35,.98);
    state.crop.cx=clamp(gesture.cx+dx/(2*stage.clientWidth),0,1);
    state.crop.cy=clamp(gesture.cy+dy/(2*stage.clientHeight),0,1);
   }else{
    state.crop.cx=clamp(gesture.cx+dx/stage.clientWidth,0,1);
    state.crop.cy=clamp(gesture.cy+dy/stage.clientHeight,0,1);
   }
  }
  if(el("vl2-zoom"))el("vl2-zoom").value=Math.round(state.crop.scale*100);
  drawCrop();e.preventDefault();
 });
 function finish(e){
  active.delete(e.pointerId);if(!active.size)gesture=null;
  else{const remain=[...active.values()][0];gesture={kind:"move",x:remain.x,y:remain.y,cx:state.crop.cx,cy:state.crop.cy};}
 }
 frame.addEventListener("pointerup",finish);
 frame.addEventListener("pointercancel",finish);
 frame.addEventListener("lostpointercapture",finish);
 window.removeEventListener("resize",drawCrop);
 window.addEventListener("resize",drawCrop,{passive:true});
}
function mount(adapter){
 ctx=adapter;if(!ctx?.canAccess?.())return;
 releasePhoto();resetScan();
 const p=el("panel");if(!p)return;
 p.innerHTML='<section class="vl2" aria-label="Conferência de etiquetas">'+
  '<header class="vl2-header"><div><span class="vl2-kicker">CONTROLE DE QUALIDADE · ETIQUETAS</span><h2>Conferência de etiquetas</h2><p>Fotografe o rótulo, informe os dados da ordem de produção e confira o resultado antes de salvar.</p></div><button id="vl2-back" class="vl2-back" type="button">Voltar ao painel</button></header>'+
  '<div class="vl2-grid"><section class="vl2-capture"><div class="vl2-section-title"><span>01</span><div><h3>Uma etiqueta por foto</h3><p>Centralize o rótulo no quadro. O restante será descartado.</p></div></div>'+
  '<div class="vl2-photo" id="vl2-stage"><div class="vl2-photo-empty" id="vl2-empty"><strong>Enquadre a etiqueta</strong><small>Use a câmera traseira ou escolha uma foto salva.</small></div><video id="vl2-video" autoplay playsinline muted hidden></video><img id="vl2-image" alt="Etiqueta recortada" hidden><div id="vl2-frame" class="vl2-frame" hidden><span>DESLIZE PARA POSICIONAR</span><i class="vl2-resize-grip" aria-hidden="true"></i></div></div>'+
  '<div id="vl2-crop-tools" class="vl2-crop-tools" hidden><div><button id="vl2-square" type="button">Quadrado</button><button id="vl2-rectangle" class="active" type="button">Horizontal</button><button id="vl2-portrait" type="button">Vertical</button></div><button id="vl2-center" type="button" class="vl2-center-btn">Centralizar quadro</button><label>Tamanho<input id="vl2-zoom" type="range" min="35" max="98" value="85"></label></div>'+
  '<div class="vl2-actions"><button id="vl2-open-camera" type="button" class="vl2-snap">Abrir câmera traseira</button><label class="vl2-gallery">Escolher foto<input id="vl2-gallery" type="file" accept="image/jpeg,image/png,image/webp"></label></div>'+
  '<button id="vl2-capture" type="button" class="vl2-apply" hidden>Capturar somente a área marcada</button>'+
  '<button id="vl2-apply-crop" type="button" class="vl2-apply" hidden>Recortar e analisar etiqueta</button>'+
  '<div id="vl2-progress" class="vl2-progress" hidden>Reconhecendo dados…</div><div id="vl2-notice" class="vl2-notice" hidden></div>'+
  '<p class="vl2-photo-foot">A foto é analisada após o recorte. O reconhecimento pode falhar com reflexos, letras pequenas ou imagens desfocadas.</p></section>'+
  '<section class="vl2-result"><div class="vl2-section-title"><span>02</span><div><h3>Análise e validação</h3><p>As referências são solicitadas depois que a fotografia for analisada.</p></div></div><div id="vl2-results"></div></section></div>'+
  '<section class="vl2-recent"><div class="vl2-history-head"><h3>Histórico de conferências</h3><small>Fotografias, resultados e responsáveis</small></div><div id="vl2-history">Carregando histórico…</div>'+
  (ctx.isMaster?.()?'<details class="vl2-archive" id="vl2-archive"><summary>Registros ocultados · apenas administrador</summary><div id="vl2-archived-list">Abra para consultar.</div></details>':"")+'</section><div id="vl2-dialog-host"></div>'+
  '<p class="vl2-foot">A conferência digital compara informações reconhecidas com o manual e os padrões cadastrados. Um campo ilegível ou sem referência confiável permanece pendente. A liberação física continua sob responsabilidade da equipe autorizada.</p></section>';
 el("vl2-back")?.addEventListener("click",()=>{releasePhoto();ctx.back();});
 el("vl2-open-camera")?.addEventListener("click",beginCamera);
 el("vl2-gallery")?.addEventListener("change",e=>{const file=e.target.files?.[0];e.target.value="";if(file)useFile(file);});
 el("vl2-capture")?.addEventListener("click",captureCamera);
 el("vl2-apply-crop")?.addEventListener("click",finishCrop);
 el("vl2-square")?.addEventListener("click",()=>{state.crop.ratio=1;setCropShape("vl2-square");drawCrop();});
 el("vl2-rectangle")?.addEventListener("click",()=>{state.crop.ratio=1.5;setCropShape("vl2-rectangle");drawCrop();});
 el("vl2-portrait")?.addEventListener("click",()=>{state.crop.ratio=.68;setCropShape("vl2-portrait");drawCrop();});
 el("vl2-center")?.addEventListener("click",()=>{state.crop.cx=.5;state.crop.cy=.5;drawCrop();});
 el("vl2-zoom")?.addEventListener("input",e=>{state.crop.scale=Number(e.target.value)/100;drawCrop();});
 el("vl2-archive")?.addEventListener("toggle",e=>{if(e.target.open)fetchArchived();});
 bindFrame();showResult();loadPatterns();loadEntities();fetchHistory();
}
window.VITRA_LABEL_SMART={mount,catalogCount:catalog.length,reference:"DOC.CQ.056"};
})();