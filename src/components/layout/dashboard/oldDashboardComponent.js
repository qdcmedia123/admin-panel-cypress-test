class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.logoutInvalidSession = logoutInvalidSession.bind(this);
  }
  // Send axios reques if component did mount
  componentDidMount() {
    const apiLink = "/api/v1/listClients";
    Service.get(`${apiLink}/0/1/All`, {}, (response) => {}).catch((error) => {
      console.log(error);
    });
  }

  componentWillUnmount() {
    return null;
  }

  render() {
    const options = {
      chart: {
        type: "area",
      },
      accessibility: {
        description:
          "Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.",
      },
      title: {
        text: "US and USSR nuclear stockpiles",
      },
      subtitle: {
        text:
          'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
          'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
          "armscontrol.org</a>",
      },
      xAxis: {
        allowDecimals: false,
        labels: {
          formatter: function () {
            return this.value; // clean, unformatted number for year
          },
        },
        accessibility: {
          rangeDescription: "Range: 1940 to 2017.",
        },
      },
      yAxis: {
        title: {
          text: "Nuclear weapon states",
        },
        labels: {
          formatter: function () {
            return this.value / 1000 + "k";
          },
        },
      },
      tooltip: {
        pointFormat:
          "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}",
      },
      plotOptions: {
        area: {
          pointStart: 1940,
          marker: {
            enabled: false,
            symbol: "circle",
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      series: [
        {
          name: "USA",
          data: [
            null,
            null,
            null,
            null,
            null,
            6,
            11,
            32,
            110,
            235,
            369,
            640,
            1005,
            1436,
            2063,
            3057,
            4618,
            6444,
            9822,
            15468,
            20434,
            24126,
            27387,
            29459,
            31056,
            31982,
            32040,
            31233,
            29224,
            27342,
            26662,
            26956,
            27912,
            28999,
            28965,
            27826,
            25579,
            25722,
            24826,
            24605,
            24304,
            23464,
            23708,
            24099,
            24357,
            24237,
            24401,
            24344,
            23586,
            22380,
            21004,
            17287,
            14747,
            13076,
            12555,
            12144,
            11009,
            10950,
            10871,
            10824,
            10577,
            10527,
            10475,
            10421,
            10358,
            10295,
            10104,
            9914,
            9620,
            9326,
            5113,
            5113,
            4954,
            4804,
            4761,
            4717,
            4368,
            4018,
          ],
        },
        {
          name: "USSR/Russia",
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            5,
            25,
            50,
            120,
            150,
            200,
            426,
            660,
            869,
            1060,
            1605,
            2471,
            3322,
            4238,
            5221,
            6129,
            7089,
            8339,
            9399,
            10538,
            11643,
            13092,
            14478,
            15915,
            17385,
            19055,
            21205,
            23044,
            25393,
            27935,
            30062,
            32049,
            33952,
            35804,
            37431,
            39197,
            45000,
            43000,
            41000,
            39000,
            37000,
            35000,
            33000,
            31000,
            29000,
            27000,
            25000,
            24000,
            23000,
            22000,
            21000,
            20000,
            19000,
            18000,
            18000,
            17000,
            16000,
            15537,
            14162,
            12787,
            12600,
            11400,
            5500,
            4512,
            4502,
            4502,
            4500,
            4500,
          ],
        },
      ],
    };

    const options2 = {
      chart: {
        type: "column",
      },
      title: {
        text: "World's largest cities per 2017",
      },
      subtitle: {
        text:
          'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>',
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Population (millions)",
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: "Population in 2017: <b>{point.y:.1f} millions</b>",
      },
      series: [
        {
          name: "Population",
          data: [
            ["Shanghai", 24.2],
            ["Beijing", 20.8],
            ["Karachi", 14.9],
            ["Shenzhen", 13.7],
            ["Guangzhou", 13.1],
            ["Istanbul", 12.7],
            ["Mumbai", 12.4],
            ["Moscow", 12.2],
            ["São Paulo", 12.0],
            ["Delhi", 11.7],
            ["Kinshasa", 11.5],
            ["Tianjin", 11.2],
            ["Lahore", 11.1],
            ["Jakarta", 10.6],
          ],
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: "#FFFFFF",
            align: "right",
            format: "{point.y:.1f}", // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        },
      ],
    };

    return (
      <div>
        <Header />
        {/*
          
          */}

        <div className="wrapper">
          <div className="container-fluid dashboard__page__content">
            <div className="row">
              <div className="col-md-12">
                <div className="hello">Hello Yacoob Nuseibeh</div>
                <div className="date__dashboard">16 December</div>
              </div>
            </div>

            <div className="row">
              <div className="item__card-container_4x">
                <div className="item__card-item each__rows">
                  <div className="first__colum">
                    <div className="page__visit">PAGE VISIT </div>
                    <div className="rate__number float-right positive">
                      {" "}
                      <img
                        src={require("../../../assets/img/Arrow 4.png")}
                        alt="Wealthface"
                        title="Dashboard"
                      />
                      10.12%{" "}
                    </div>
                  </div>

                  <div className="secound__colum">
                    <div className="amount__bold">
                      <h4 className="amount__home">1,320</h4>
                    </div>
                    <div className="little__graph float-right">
                      <img
                        src={require("../../../assets/img/Vector_green.png")}
                        alt="Wealthface"
                        title="Dashboard"
                      />
                    </div>
                  </div>
                </div>
                <div className="item__card-item each__rows">
                  <div className="first__colum">
                    <div className="page__visit">PAGE VISIT </div>
                    <div className="rate__number float-right negative">
                      {" "}
                      <img
                        src={require("../../../assets/img/Arrow 2.png")}
                        alt="Wealthface"
                        title="Dashboard"
                      />
                      10.12%{" "}
                    </div>
                  </div>

                  <div className="secound__colum">
                    <div className="amount__bold">
                      <h4 className="amount__home">1,320</h4>
                    </div>
                    <div className="little__graph float-right">
                      <img
                        src={require("../../../assets/img/graphic.png")}
                        alt="Wealthface"
                        title="Dashboard"
                      />
                    </div>
                  </div>
                </div>
                <div className="item__card-item each__rows">
                  <div className="first__colum">
                    <div className="page__visit">PAGE VISIT </div>
                    <div className="rate__number float-right positive">
                      {" "}
                      <img
                        src={require("../../../assets/img/Arrow 4.png")}
                        alt="Wealthface"
                        title="Dashboard"
                      />
                      10.12%{" "}
                    </div>
                  </div>

                  <div className="secound__colum">
                    <div className="amount__bold">
                      <h4 className="amount__home">1,320</h4>
                    </div>
                    <div className="little__graph float-right">
                      <img
                        src={require("../../../assets/img/Vector_green.png")}
                        alt="Wealthface"
                        title="Dashboard"
                      />
                    </div>
                  </div>
                </div>
                <div className="item__card-item each__rows">
                  <div className="first__colum">
                    <div className="page__visit">PAGE VISIT </div>
                    <div className="rate__number float-right">
                      {" "}
                      <img
                        src={require("../../../assets/img/Arrow 4.png")}
                        alt="Wealthface"
                        title="Dashboard"
                      />
                      10.12%{" "}
                    </div>
                  </div>

                  <div className="secound__colum">
                    <div className="amount__bold">
                      <h4 className="amount__home">1,320</h4>
                    </div>
                    <div className="little__graph float-right">
                      <img
                        src={require("../../../assets/img/Vector_green.png")}
                        alt="Wealthface"
                        title="Dashboard"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid section__2">
            <div className="row nopadding price_evolotion__container">
              <div className="col-md-6">
                <div className="price__evolution">Price Evolution</div>
              </div>
              <div className="col-md-6">
                <div className="months__tabs_container text-right">
                  <span className="selected__month_tab months__tabs"> 1m</span>
                  <span className="months__tabs"> 1m</span>
                  <span className="months__tabs"> 1m</span>
                  <span className="months__tabs radius-5"> 1m</span>
                </div>
              </div>
            </div>

            <div className="price__evolution__box__container">
              <div
                id="myCarousel"
                className="carousel slide w-100"
                data-ride="carousel"
              >
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item py-5 active">
                    <div className="row nopadding">
                      <div className="col-sm-3">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-inline dotted">
                              <img
                                src={require("../../../assets/img/balanced.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </div>

                            <div className="d-inline risk__and__price">
                              <div className="risk__text"> Low Risk</div>
                              <div className="risk__amount">$20.000</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-inline dotted">
                              <img
                                src={require("../../../assets/img/balanced.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </div>

                            <div className="d-inline risk__and__price">
                              <div className="risk__text"> Low Risk</div>
                              <div className="risk__amount">$20.000</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-inline dotted">
                              <img
                                src={require("../../../assets/img/balanced.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </div>

                            <div className="d-inline risk__and__price">
                              <div className="risk__text"> Low Risk</div>
                              <div className="risk__amount">$20.000</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-inline dotted">
                              <img
                                src={require("../../../assets/img/balanced.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </div>

                            <div className="d-inline risk__and__price">
                              <div className="risk__text"> Low Risk</div>
                              <div className="risk__amount">$20.000</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item py-5">
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-inline dotted">
                              <img
                                src={require("../../../assets/img/balanced.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </div>

                            <div className="d-inline risk__and__price">
                              <div className="risk__text"> Low Risk</div>
                              <div className="risk__amount">$20.000</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <a
                  className="carousel-control-prev text-dark"
                  href="#myCarousel"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="fa fa-chevron-left"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next text-dark"
                  href="#myCarousel"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="fa fa-chevron-right"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>

            <div className="row nopadding">
              <div className="col-md-12">
                <div className="graph">
                  <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid section__3">
            <div className="asset__under__managment__and_title item__card-container_2fr1fr">
              <div className="asset__under__managment section__3__1">
                <div className="row nopadding price_evolotion__container">
                  <div className="col-md-6">
                    <div className="price__evolution">
                      Assets Under Management
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="months__tabs_container text-right">
                      <span className="selected__month_tab months__tabs">
                        {" "}
                        1m
                      </span>
                      <span className="months__tabs"> 1m</span>
                      <span className="months__tabs"> 1m</span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h3 className="doller">$20, 0000</h3>
                  </div>

                  <div className="col-md-12 nopadding">
                    <div className="item__card-container__tow__fr ">
                      <div className="value__investement">
                        <div className="v__i"> Value Instement</div>
                        <div className="doller__V__I">$12.0000.00</div>
                      </div>

                      <div className="cash__balance">
                        <div className="v__i"> Value Instement</div>
                        <div className="doller__V__I">$12.0000.00</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 nopadding">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options2}
                    />
                  </div>
                </div>
              </div>

              <div className="title">Here will be map</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
