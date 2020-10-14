module.exports = function Greet(greeting) {


    async function homeRoute(req, res) {
        var greet = { counter : await greeting.getCounter()}

        res.render('index', {
            greet
        });

    }

    async function greetPerson(req, res) {
        var namesEntered = req.body.user;
        var radioChecked = req.body.language;

        if (!namesEntered && !radioChecked) {
            req.flash('info', 'Please enter a name and select a language');
        }
        else if (!namesEntered) {
            req.flash('info', 'Please enter a name');
        }
        else if (!radioChecked) {
            req.flash('info', 'Please select a language');
        } else {
            var greet = {
                greetName: await greeting.languageChecked(radioChecked, namesEntered),
                counter: await greeting.getCounter()
            }

        }

        res.render('index', {
            greet
        });
    }


    async function greeted(req, res) {
        // console.log(await greeting.getGreetedNames());
        res.render('greeted', {
            names: await greeting.getGreetedNames(),
        });

    }

    async function counter(req, res) {
        const userGreeted = req.params.user;
        let personsMessage = await greeting.nameGreeted(userGreeted)
        console.log(personsMessage)
        res.render('counter', {
            sentence: await personsMessage
        });
    }

    async function reset(req, res) {
        await greeting.clear();
        res.redirect('/');
    }

    async function backBtn(req, res) {
        res.render('greeted', {
            names: await greeting.getGreetedNames()

        });
    }


    return {
        greeted,
        counter,
        reset,
        backBtn,
        greetPerson,
        homeRoute

    };
}
