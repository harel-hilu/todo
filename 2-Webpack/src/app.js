const person = {
    name: "Vita",
    getFullName: function (lastname) {
        return this.name + " " + lastname;
    } 
}

alert(person.getFullName.bind({name: "Vita"}, "bertman")());