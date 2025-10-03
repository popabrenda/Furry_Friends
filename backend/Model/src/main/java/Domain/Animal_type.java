package Domain;

public class Animal_type extends Entity{
    String species;
    String breed;
    SizeCategory size_category;
    DailyCareRequirement daily_care_requirement;

    public Animal_type(int id, String species, String breed, SizeCategory size_category, DailyCareRequirement daily_care_requirement) {
        super(id);
        this.species = species;
        this.breed = breed;
        this.size_category = size_category;
        this.daily_care_requirement = daily_care_requirement;
    }

    public Animal_type(String species, String breed, SizeCategory size_category, DailyCareRequirement daily_care_requirement) {
        this.species = species;
        this.breed = breed;
        this.size_category = size_category;
        this.daily_care_requirement = daily_care_requirement;
    }

    public Animal_type() {

    }

    public Animal_type(int id)
    {
        this.id=id;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public SizeCategory getSize_category() {
        return size_category;
    }

    public void setSize_category(SizeCategory size_category) {
        this.size_category = size_category;
    }

    public DailyCareRequirement getDaily_care_requirement() {
        return daily_care_requirement;
    }

    public void setDaily_care_requirement(DailyCareRequirement daily_care_requirement) {
        this.daily_care_requirement = daily_care_requirement;
    }

    @Override
    public String toString() {
        return "Animal_type{" +
                "id=" + id +
                ", species='" + species + '\'' +
                ", breed='" + breed + '\'' +
                ", size_category='" + size_category + '\'' +
                ", daily_care_requirement='" + daily_care_requirement + '\'' +
                '}';
    }
}
