'use strict';

class Car {
  #validator(value, border1, border2) {
    if (
      typeof value === 'string' &&
      value.length >= border1 &&
      value.length <= border2
    ) {
      return value;
    } else if (
      typeof value === 'number' &&
      value >= border1 &&
      value <= border2
    ) {
      return value;
    }
  }

  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  set setBrand(brandName) {
    this.#brand = this.#validator(brandName, 1, 50);
  }

  get getBrand() {
    return this.#brand;
  }

  set setModel(modelName) {
    this.#model = this.#validator(modelName, 1, 50);
  }

  get getModel() {
    return this.#model;
  }

  set setYearOfManufacturing(yearOfManufacturing) {
    this.#yearOfManufacturing = this.#validator(
      yearOfManufacturing,
      1900,
      new Date().getFullYear()
    );
  }

  get getYearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set setMaxSpeed(maxSpeed) {
    this.#maxSpeed = this.#validator(maxSpeed, 100, 300);
  }

  get getMaxSpeed() {
    return `${this.#maxSpeed} км/ч`;
  }

  set setMaxFuelVolume(maxFuelVolume) {
    this.#maxFuelVolume = this.#validator(maxFuelVolume, 5, 20);
  }

  get getMaxFuelVolume() {
    return `${this.#maxFuelVolume} литров`;
  }

  set setFuelConsumption(fuelConsumption) {
    if (typeof fuelConsumption === 'number') {
      this.#fuelConsumption = fuelConsumption;
    }
  }

  get getFuelConsumption() {
    return `${this.#fuelConsumption} л/100км`;
  }

  get getCurrentFuelVolume() {
    return `${this.#currentFuelVolume} литров`;
  }

  get getIsStarted() {
    return this.#isStarted;
  }

  get getMileage() {
    return this.#mileage;
  }

  start() {
    if (this.#isStarted === false) {
      this.#isStarted = true;
    } else {
      throw new Error('Машина уже заведена');
    }
  }

  shutDownEngine() {
    if (this.#isStarted === true) {
      this.#isStarted = false;
    } else {
      throw new Error('Машина ещё не заведена');
    }
  }

  fillUpGasTank(fuelQuantity) {
    if (typeof fuelQuantity !== 'number') {
      throw new Error('Неверное количество топлива для заправки');
    }
    if (fuelQuantity <= 0) {
      throw new Error('Неверное количество топлива для заправки');
    }
    if (fuelQuantity > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume = fuelQuantity;
  }

  drive(speed, time) {
    function speedTimeValidator(value) {
      if (typeof value !== 'number' || value <= 0) {
        return true;
      }
    }

    if (speedTimeValidator(speed)) {
      throw new Error('Неверная скорость');
    }
    if (speedTimeValidator(time)) {
      throw new Error('Неправильное количество часов');
    }
    if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }
    if (this.#isStarted === false) {
      throw new Error('Машина должан быть заведена, чтобы ехать');
    }
    if (consumptedFuel > this.#currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    let consumptedFuel =
      Math.floor((speed * time) / 100) * this.#fuelConsumption;
    this.#mileage = speed * time;
    this.#currentFuelVolume = this.#currentFuelVolume - consumptedFuel;
  }
}

module.exports = { Car };
