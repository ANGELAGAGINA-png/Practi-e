from datetime import datetime
import calendar

def get_weekday(day, month, year):
    date = datetime(year, month, day)
    days = ["Понедельник", "Вторник", "Среда",
            "Четверг", "Пятница", "Суббота", "Воскресенье"]
    return days[date.weekday()]

def is_leap_year(year):
    return calendar.isleap(year)

def get_age(day, month, year):
    today = datetime.now()
    birth_date = datetime(year, month, day)
    age = today.year - birth_date.year
    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1
    return age

def print_star_date(day, month, year):
    date_str = f"{day:02d} {month:02d} {year}"
    star_line = ""
    for ch in date_str:
        if ch.isdigit():
            star_line += "**"
        else:
            star_line += "  "
    print("\nДата рождения в формате табло:")
    print(star_line)
    print(date_str)

def main():
    print("=== Определение информации по дате рождения ===\n")

    try:
        day = int(input("Введите день рождения: "))
        month = int(input("Введите месяц рождения: "))
        year = int(input("Введите год рождения: "))
    except ValueError:
        print("Ошибка: нужно вводить числа.")
        return

    try:
        datetime(year, month, day)
    except ValueError:
        print("Ошибка: некорректная дата!")
        return

    weekday = get_weekday(day, month, year)
    leap = is_leap_year(year)
    age = get_age(day, month, year)

    print(f"\nВаш день рождения был: {weekday}.")
    print(f"Год {year} {'високосный' if leap else 'не високосный'}.")
    print(f"Вам сейчас {age} лет.")

    print_star_date(day, month, year)

if __name__ == "__main__":
    main()