class Fraction {
  private factor: number;
  public numerator: number;
  public denominator: number;

  private greatestCommonDivisor(x: number, y: number): number {
    if (y === 0) {
      return x;
    }

    return this.greatestCommonDivisor(y, x % y);
  }

  private decimalDigits(x: number) {
    if (x % 1 === 0) {
      return 1;
    }

    return String(x - Math.floor(x)).length - 2;
  }

  private simplify() {
    const greatestCommonFactor = this.greatestCommonDivisor(
      Math.abs(this.numerator),
      Math.abs(this.denominator),
    );

    this.numerator /= greatestCommonFactor;
    this.denominator /= greatestCommonFactor;

    if (this.numerator < 0 && this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }
  }

  constructor(numerator = 0, denominator = 1) {
    this.factor =
      10 **
      Math.max(this.decimalDigits(numerator), this.decimalDigits(denominator));

    this.numerator = this.factor * numerator;
    this.denominator = this.factor * denominator;
    this.simplify();
  }

  public toString() {
    if (this.numerator === 0) {
      return "0";
    }

    if (this.denominator === 1) {
      return String(Math.floor(this.numerator / this.factor));
    }

    const simplifiedNumerator = this.numerator / this.factor;
    const simplifiedDenominator = this.denominator / this.factor;

    if (simplifiedDenominator < 0) {
      return `${-simplifiedNumerator}/${-simplifiedDenominator}`;
    }

    return `${simplifiedNumerator}/${simplifiedDenominator}`;
  }

  public toDecimal(places: number = 3) {
    if (this.denominator === 1) {
      return this.numerator;
    }

    if (this.numerator === 0) {
      return 0;
    }

    return (this.numerator / this.denominator).toFixed(places);
  }

  private getCommonImplements(other: Fraction) {
    // The fraction is simplified later anyway
    const commonDenominator = this.denominator * other.denominator;
    const equivalentNum1 = this.numerator * other.denominator;
    const equivalentNum2 = other.numerator * this.denominator;

    return { commonDenominator, equivalentNum1, equivalentNum2 } as const;
  }

  public add(other: Fraction): Fraction {
    const { commonDenominator, equivalentNum1, equivalentNum2 } =
      this.getCommonImplements(other);

    const sum = equivalentNum1 + equivalentNum2;

    return new Fraction(sum, commonDenominator);
  }

  public sub(other: Fraction): Fraction {
    const { commonDenominator, equivalentNum1, equivalentNum2 } =
      this.getCommonImplements(other);

    const difference = equivalentNum1 - equivalentNum2;

    return new Fraction(difference, commonDenominator);
  }

  public mul(other: Fraction): Fraction {
    const productNumerator = this.numerator * other.numerator;
    const productDenominator = this.denominator * other.denominator;

    return new Fraction(productNumerator, productDenominator);
  }

  public div(other: Fraction): Fraction {
    const quotientNumerator = this.numerator * other.denominator;
    const quotientDenominator = this.denominator * other.numerator;

    return new Fraction(quotientNumerator, quotientDenominator);
  }

  public reciprocal() {
    const temp = this.numerator;
    this.numerator = this.denominator;
    this.denominator = temp;

    return this;
  }
}

export default Fraction;
