function skillsMember() {
    var member = this;
    member.getSkills = function() {
        return member.skills;
    }
    member.addSkill = function(skill) {
        member.skills.push(skill);
    }
    member.removeSkill = function(skill) {
        member.skills = member.skills.filter(function(s) {
            return s !== skill;
        })
    }
    member.skills = [];
}