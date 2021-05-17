export const appointmentsQueryData = {
  data: {
    GetAppointments: {
      __typename: 'PagedResultAppointmentModel',
      _embedded: [
        {
          __typename: 'AppointmentModel',
          _eTag: '"B3948D47D154330D20AABC49AE2C964D"',
          _embedded: {},
          _links: {
            negotiators: {
              href: '/negotiators/?id=LJW',
            },
            organiser: {
              href: '/negotiators/LJW',
            },
            self: {
              href: '/appointments/RPT2000056',
            },
            type: {
              href: '/configuration/appointmentTypes/AP',
            },
          },
          accompanied: false,
          appointmentType: {
            __typename: 'ListItemModel',
            id: 'AP',
            value: 'Appointment',
          },
          attendee: '',
          attendeeConfirmed: false,
          cancelled: true,
          created: '2020-07-07T05:44:58Z',
          description: 'Meet landlord at the property to get the key.',
          end: '2020-07-08T13:30:02Z',
          followUp: {
            __typename: 'AppointmentModelFollowUp',
            due: '2020-07-09',
            notes: '',
            responseId: '',
          },
          id: 'RPT2000056',
          metadata: {},
          modified: '2020-07-08T08:24:13Z',
          negotiatorConfirmed: false,
          negotiatorIds: ['LJW'],
          negotiators: [
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LJW',
                },
              },
              active: true,
              created: '2014-11-10T15:24:39Z',
              email: 'emilie.boyd@reapitestates.net',
              id: 'LJW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2020-07-07T08:14:31Z',
              name: 'Liam Jowett',
              officeId: 'ALB',
              workPhone: '',
            },
          ],
          officeIds: [],
          offices: [],
          organiserId: 'LJW',
          property: '',
          propertyConfirmed: false,
          propertyId: '',
          recurring: false,
          start: '2020-07-08T12:30:02Z',
          typeId: 'AP',
        },
        {
          __typename: 'AppointmentModel',
          _eTag: '"18113B525A28EF3F5C0B289F81658F9F"',
          _embedded: {},
          _links: {
            negotiators: {
              href: '/negotiators/?id=LJW',
            },
            organiser: {
              href: '/negotiators/LJW',
            },
            self: {
              href: '/appointments/RPT2000057',
            },
            type: {
              href: '/configuration/appointmentTypes/VW',
            },
          },
          accompanied: false,
          appointmentType: {
            __typename: 'ListItemModel',
            id: 'VW',
            value: 'Viewing',
          },
          attendee: '',
          attendeeConfirmed: false,
          cancelled: true,
          created: '2020-07-07T05:46:53Z',
          description: 'Meet landlord at the property to get the key.',
          end: '2020-07-08T13:30:02Z',
          followUp: {
            __typename: 'AppointmentModelFollowUp',
            due: '2020-07-09',
            notes: '',
            responseId: '',
          },
          id: 'RPT2000057',
          metadata: {},
          modified: '2020-07-08T08:26:07Z',
          negotiatorConfirmed: false,
          negotiatorIds: ['LJW'],
          negotiators: [
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LJW',
                },
              },
              active: true,
              created: '2014-11-10T15:24:39Z',
              email: 'emilie.boyd@reapitestates.net',
              id: 'LJW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2020-07-07T08:14:31Z',
              name: 'Liam Jowett',
              officeId: 'ALB',
              workPhone: '',
            },
          ],
          officeIds: [],
          offices: [],
          organiserId: 'LJW',
          property: '',
          propertyConfirmed: false,
          propertyId: '',
          recurring: false,
          start: '2020-07-08T12:30:02Z',
          typeId: 'VW',
        },
        {
          __typename: 'AppointmentModel',
          _eTag: '"342E83AC106AD7264C8473B199E079D0"',
          _embedded: {},
          _links: {
            attendee: {
              href: '/applicants/ALB2000006',
            },
            negotiators: {
              href: '/negotiators/?id=LJW&id=LXJ&id=LSB&id=JCW',
            },
            offices: {
              href: '/offices/?id=ALB',
            },
            organiser: {
              href: '/negotiators/LJW',
            },
            property: {
              href: '/properties/ALB160019',
            },
            self: {
              href: '/appointments/ALB2000006',
            },
            type: {
              href: '/configuration/appointmentTypes/VW',
            },
          },
          accompanied: true,
          appointmentType: {
            __typename: 'ListItemModel',
            id: 'VW',
            value: 'Viewing',
          },
          attendee: {
            __typename: 'AppointmentAttendeeModel',
            contacts: [
              {
                __typename: 'AppointmentContactModel',
                email: 'hdale580@rpsfiction.net',
                homePhone: '01632 962190',
                id: 'BDF15001578',
                mobilePhone: '07700 902190',
                name: 'Ms Harper Dale',
                workPhone: '020 7946 2190',
              },
              {
                __typename: 'AppointmentContactModel',
                email: 'tallan423@rpsfiction.net',
                homePhone: '01632 960169',
                id: 'BDF15001579',
                mobilePhone: '07700 900169',
                name: 'Mr Teddy Allan',
                workPhone: '020 7946 0169',
              },
            ],
            id: 'BDF151344',
            type: 'applicant',
          },
          attendeeConfirmed: false,
          cancelled: false,
          created: '2020-04-15T20:36:27Z',
          description: '',
          end: '2020-07-08T14:30:00Z',
          followUp: {
            __typename: 'AppointmentModelFollowUp',
            due: '2020-07-09',
            notes: '',
            responseId: '',
          },
          id: 'ALB2000006',
          metadata: {},
          modified: '2020-07-07T08:14:19Z',
          negotiatorConfirmed: false,
          negotiatorIds: ['LJW', 'LXJ', 'LSB', 'JCW'],
          negotiators: [
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LJW',
                },
              },
              active: true,
              created: '2014-11-10T15:24:39Z',
              email: 'emilie.boyd@reapitestates.net',
              id: 'LJW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2020-07-07T08:14:31Z',
              name: 'Liam Jowett',
              officeId: 'ALB',
              workPhone: '',
            },
            {
              __typename: 'NegotiatorModel',
              _eTag: '"85F585A47F82909C139CAE0CDF76BD29"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LXJ',
                },
              },
              active: true,
              created: '2013-01-15T13:49:55Z',
              email: 'fletcher.barr@reapitestates.net',
              id: 'LXJ',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2016-10-17T07:47:53Z',
              name: 'Fletcher Barr',
              officeId: 'ALB',
              workPhone: '',
            },
            {
              __typename: 'NegotiatorModel',
              _eTag: '"D03398DFF51B9876BD04C925F52A6A04"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LSB',
                },
              },
              active: true,
              created: '2015-01-11T15:32:15Z',
              email: 'killian.allen@reapitestates.net',
              id: 'LSB',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2016-09-16T10:23:16Z',
              name: 'Killian Allen',
              officeId: 'ALB',
              workPhone: '',
            },
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB56729ECEF1690220F7C041B9A55125"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/JCW',
                },
              },
              active: true,
              created: '2011-12-27T15:08:47Z',
              email: 'mara.grieve@reapitestates.net',
              id: 'JCW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2016-09-21T15:54:30Z',
              name: 'Mara Grieve',
              officeId: 'ALB',
              workPhone: '',
            },
          ],
          officeIds: ['ALB'],
          offices: [
            {
              __typename: 'OfficeModel',
              _eTag: '"9B4650E205A1B4DDB0E4A3CB98F4435F"',
              _embedded: {},
              _links: {
                negotiators: {
                  href: '/negotiators/?officeId=ALB',
                },
                self: {
                  href: '/offices/ALB',
                },
              },
              address: {
                __typename: 'OfficeModelAddress',
                buildingName: '',
                buildingNumber: '',
                countryId: '',
                line1: 'Exchange Street',
                line2: 'Aylesbury',
                line3: '',
                line4: '',
                postcode: 'HP19 9QL',
              },
              created: '2011-12-26T17:55:46Z',
              email: 'salesa@hughmason.co.uk',
              id: 'ALB',
              manager: 'Gabriela Broadfoot',
              metadata: {},
              modified: '2020-02-14T16:03:23Z',
              name: 'Stoke Mandeville',
              workPhone: '',
            },
          ],
          organiserId: 'LJW',
          property: {
            __typename: 'PropertyModel',
            address: {
              __typename: 'PropertyModelAddress',
              buildingName: 'Yew Tree Cottage',
              buildingNumber: '',
              countryId: 'GB',
              geolocation: {
                __typename: 'PropertyModelAddressGeolocation',
                latitude: 51.869761,
                longitude: -1.125311,
              },
              line1: 'Church Walk',
              line2: 'Ambrosden',
              line3: 'Bicester',
              line4: 'Oxfordshire',
              postcode: 'OX25 2UJ',
            },
            id: 'ALB160019',
          },
          propertyConfirmed: false,
          propertyId: 'ALB160019',
          recurring: false,
          start: '2020-07-08T14:00:00Z',
          typeId: 'VW',
        },
        {
          __typename: 'AppointmentModel',
          _eTag: '"39EF2C8B555CC5752FEA1C42BBEE6FC5"',
          _embedded: {},
          _links: {
            attendee: {
              href: '/applicants/ALB2000019',
            },
            negotiators: {
              href: '/negotiators/?id=LJW',
            },
            organiser: {
              href: '/negotiators/LJW',
            },
            property: {
              href: '/properties/BCK140280',
            },
            self: {
              href: '/appointments/ALB2000019',
            },
            type: {
              href: '/configuration/appointmentTypes/VW',
            },
          },
          accompanied: true,
          appointmentType: {
            __typename: 'ListItemModel',
            id: 'VW',
            value: 'Viewing',
          },
          attendee: {
            __typename: 'AppointmentAttendeeModel',
            contacts: [
              {
                __typename: 'AppointmentContactModel',
                email: 'rakhtar327@rpsfiction.net',
                homePhone: '01632 960103',
                id: 'BDF15001570',
                mobilePhone: '07700 900103',
                name: 'Mr Ronnie Akhtar',
                workPhone: '020 7946 0103',
              },
            ],
            id: 'BDF151338',
            type: 'applicant',
          },
          attendeeConfirmed: false,
          cancelled: false,
          created: '2020-07-07T11:07:18Z',
          description: '',
          end: '2020-07-09T11:00:00Z',
          followUp: {
            __typename: 'AppointmentModelFollowUp',
            due: '2020-07-10',
            notes: '',
            responseId: '',
          },
          id: 'ALB2000019',
          metadata: {},
          modified: '',
          negotiatorConfirmed: false,
          negotiatorIds: ['LJW'],
          negotiators: [
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LJW',
                },
              },
              active: true,
              created: '2014-11-10T15:24:39Z',
              email: 'emilie.boyd@reapitestates.net',
              id: 'LJW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2020-07-07T08:14:31Z',
              name: 'Liam Jowett',
              officeId: 'ALB',
              workPhone: '',
            },
          ],
          officeIds: [],
          offices: [],
          organiserId: 'LJW',
          property: {
            __typename: 'PropertyModel',
            address: {
              __typename: 'PropertyModelAddress',
              buildingName: 'Belmont',
              buildingNumber: '',
              countryId: 'GB',
              geolocation: {
                __typename: 'PropertyModelAddressGeolocation',
                latitude: 51.955674,
                longitude: -0.904381,
              },
              line1: 'Hanover Farm',
              line2: '',
              line3: 'Addington',
              line4: 'Buckingham',
              postcode: 'MK18 2JW',
            },
            id: 'BCK140280',
            selling: {
              vendorId: 'TEST_VENDOR',
            },
          },
          propertyConfirmed: false,
          propertyId: 'BCK140280',
          recurring: false,
          start: '2020-07-09T10:30:00Z',
          typeId: 'VW',
        },
        {
          __typename: 'AppointmentModel',
          _eTag: '"AC34386F99C610C4C14608C4D41E8F5C"',
          _embedded: {},
          _links: {
            attendee: {
              href: '/applicants/ALB2000014',
            },
            negotiators: {
              href: '/negotiators/?id=LJW',
            },
            organiser: {
              href: '/negotiators/LJW',
            },
            property: {
              href: '/properties/MLK150058',
            },
            self: {
              href: '/appointments/ALB2000014',
            },
            type: {
              href: '/configuration/appointmentTypes/VW',
            },
          },
          accompanied: true,
          appointmentType: {
            __typename: 'ListItemModel',
            id: 'VW',
            value: 'Viewing',
          },
          attendee: {
            __typename: 'AppointmentAttendeeModel',
            contacts: [
              {
                __typename: 'AppointmentContactModel',
                email: 'pbeggs894@rpsfiction.net',
                homePhone: '01632 960586',
                id: 'MLK16000045',
                mobilePhone: '07700 900586',
                name: 'Ms Poppy Beggs',
                workPhone: '020 7946 0586',
              },
            ],
            id: 'MLK160037',
            type: 'applicant',
          },
          attendeeConfirmed: false,
          cancelled: false,
          created: '2020-07-07T11:05:31Z',
          description: '',
          end: '2020-07-10T11:00:00Z',
          followUp: {
            __typename: 'AppointmentModelFollowUp',
            due: '2020-07-11',
            notes: '',
            responseId: '',
          },
          id: 'ALB2000014',
          metadata: {},
          modified: '',
          negotiatorConfirmed: false,
          negotiatorIds: ['LJW'],
          negotiators: [
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LJW',
                },
              },
              active: true,
              created: '2014-11-10T15:24:39Z',
              email: 'emilie.boyd@reapitestates.net',
              id: 'LJW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2020-07-07T08:14:31Z',
              name: 'Liam Jowett',
              officeId: 'ALB',
              workPhone: '',
            },
          ],
          officeIds: [],
          offices: [],
          organiserId: 'LJW',
          property: {
            __typename: 'PropertyModel',
            address: {
              __typename: 'PropertyModelAddress',
              buildingName: '',
              buildingNumber: '78',
              countryId: 'GB',
              geolocation: {
                __typename: 'PropertyModelAddressGeolocation',
                latitude: 52.045718,
                longitude: -0.711487,
              },
              line1: 'Wadworth Holme',
              line2: 'Middleton',
              line3: 'Milton Keynes',
              line4: 'Buckinghamshire',
              postcode: 'MK10 9JR',
            },
            id: 'MLK150058',
          },
          propertyConfirmed: false,
          propertyId: 'MLK150058',
          recurring: false,
          start: '2020-07-10T10:30:00Z',
          typeId: 'VW',
        },
        {
          __typename: 'AppointmentModel',
          _eTag: '"F36502B04565E4027051408A25BA0137"',
          _embedded: {},
          _links: {
            attendee: {
              href: '/applicants/ALB2000021',
            },
            negotiators: {
              href: '/negotiators/?id=LJW',
            },
            organiser: {
              href: '/negotiators/LJW',
            },
            property: {
              href: '/properties/BCK150232',
            },
            self: {
              href: '/appointments/ALB2000021',
            },
            type: {
              href: '/configuration/appointmentTypes/VW',
            },
          },
          accompanied: true,
          appointmentType: {
            __typename: 'ListItemModel',
            id: 'VW',
            value: 'Viewing',
          },
          attendee: {
            __typename: 'AppointmentAttendeeModel',
            contacts: [
              {
                __typename: 'AppointmentContactModel',
                email: 'ebrown890@rpsfiction.net',
                homePhone: '01632 960999',
                id: 'NGL16000082',
                mobilePhone: '07700 900999',
                name: 'Mr Elijah Brown',
                workPhone: '020 7946 0999',
              },
            ],
            id: 'NGL160064',
            type: 'applicant',
          },
          attendeeConfirmed: false,
          cancelled: false,
          created: '2020-07-07T11:07:51Z',
          description: '',
          end: '2020-07-11T10:30:00Z',
          followUp: {
            __typename: 'AppointmentModelFollowUp',
            due: '2020-07-12',
            notes: '',
            responseId: '',
          },
          id: 'ALB2000021',
          metadata: {},
          modified: '',
          negotiatorConfirmed: false,
          negotiatorIds: ['LJW'],
          negotiators: [
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LJW',
                },
              },
              active: true,
              created: '2014-11-10T15:24:39Z',
              email: 'emilie.boyd@reapitestates.net',
              id: 'LJW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2020-07-07T08:14:31Z',
              name: 'Liam Jowett',
              officeId: 'ALB',
              workPhone: '',
            },
          ],
          officeIds: [],
          offices: [],
          organiserId: 'LJW',
          property: {
            __typename: 'PropertyModel',
            address: {
              __typename: 'PropertyModelAddress',
              buildingName: 'Sunnyside',
              buildingNumber: '',
              countryId: 'GB',
              geolocation: {
                __typename: 'PropertyModelAddressGeolocation',
                latitude: 51.997719,
                longitude: -0.99011,
              },
              line1: 'St. Rumbolds Lane',
              line2: 'Buckingham',
              line3: 'Buckinghamshire',
              line4: '',
              postcode: 'MK18 1BX',
            },
            id: 'BCK150232',
          },
          propertyConfirmed: false,
          propertyId: 'BCK150232',
          recurring: false,
          start: '2020-07-11T10:00:00Z',
          typeId: 'VW',
        },
        {
          __typename: 'AppointmentModel',
          _eTag: '"CFAB92FF58A4BDB50501FB6203F403FF"',
          _embedded: {},
          _links: {
            attendee: {
              href: '/applicants/ALB2000015',
            },
            negotiators: {
              href: '/negotiators/?id=LJW',
            },
            organiser: {
              href: '/negotiators/LJW',
            },
            self: {
              href: '/appointments/ALB2000015',
            },
            type: {
              href: '/configuration/appointmentTypes/AP',
            },
          },
          accompanied: true,
          appointmentType: {
            __typename: 'ListItemModel',
            id: 'AP',
            value: 'Appointment',
          },
          attendee: {
            __typename: 'AppointmentAttendeeModel',
            contacts: [
              {
                __typename: 'AppointmentContactModel',
                email: 'jbrown866@rpsfiction.net',
                homePhone: '01632 961019',
                id: 'BDF12000283',
                mobilePhone: '07700 901019',
                name: 'Mr Jenson Brown',
                workPhone: '020 7946 1019',
              },
            ],
            id: 'BDF130558',
            type: 'applicant',
          },
          attendeeConfirmed: false,
          cancelled: false,
          created: '2020-07-07T11:05:43Z',
          description: '',
          end: '2020-07-13T12:00:00Z',
          followUp: {
            __typename: 'AppointmentModelFollowUp',
            due: '',
            notes: '',
            responseId: '',
          },
          id: 'ALB2000015',
          metadata: {},
          modified: '',
          negotiatorConfirmed: false,
          negotiatorIds: ['LJW'],
          negotiators: [
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LJW',
                },
              },
              active: true,
              created: '2014-11-10T15:24:39Z',
              email: 'emilie.boyd@reapitestates.net',
              id: 'LJW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2020-07-07T08:14:31Z',
              name: 'Liam Jowett',
              officeId: 'ALB',
              workPhone: '',
            },
          ],
          officeIds: [],
          offices: [],
          organiserId: 'LJW',
          property: '',
          propertyConfirmed: false,
          propertyId: '',
          recurring: false,
          start: '2020-07-13T11:30:00Z',
          typeId: 'AP',
        },
        {
          __typename: 'AppointmentModel',
          _eTag: '"05A1BA5D322E7B883C1BD02C8A22BC3E"',
          _embedded: {},
          _links: {
            attendee: {
              href: '/applicants/ALB2000016',
            },
            negotiators: {
              href: '/negotiators/?id=LJW',
            },
            organiser: {
              href: '/negotiators/LJW',
            },
            property: {
              href: '/properties/BDF110502',
            },
            self: {
              href: '/appointments/ALB2000016',
            },
            type: {
              href: '/configuration/appointmentTypes/VW',
            },
          },
          accompanied: true,
          appointmentType: {
            __typename: 'ListItemModel',
            id: 'VW',
            value: 'Viewing',
          },
          attendee: {
            __typename: 'AppointmentAttendeeModel',
            contacts: [
              {
                __typename: 'AppointmentContactModel',
                email: 'cjackson837@rpsfiction.net',
                homePhone: '01632 964648',
                id: 'BCK15000136',
                mobilePhone: '07700 904648',
                name: 'Mr Colton Jackson',
                workPhone: '020 7946 4648',
              },
            ],
            id: 'BCK150108',
            type: 'applicant',
          },
          attendeeConfirmed: false,
          cancelled: false,
          created: '2020-07-07T11:06:03Z',
          description: '',
          end: '2020-07-14T14:30:00Z',
          followUp: {
            __typename: 'AppointmentModelFollowUp',
            due: '2020-07-15',
            notes: '',
            responseId: '',
          },
          id: 'ALB2000016',
          metadata: {},
          modified: '',
          negotiatorConfirmed: false,
          negotiatorIds: ['LJW'],
          negotiators: [
            {
              __typename: 'NegotiatorModel',
              _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
              _embedded: {},
              _links: {
                office: {
                  href: '/offices/ALB',
                },
                self: {
                  href: '/negotiators/LJW',
                },
              },
              active: true,
              created: '2014-11-10T15:24:39Z',
              email: 'emilie.boyd@reapitestates.net',
              id: 'LJW',
              jobTitle: '',
              metadata: {},
              mobilePhone: '',
              modified: '2020-07-07T08:14:31Z',
              name: 'Liam Jowett',
              officeId: 'ALB',
              workPhone: '',
            },
          ],
          officeIds: [],
          offices: [],
          organiserId: 'LJW',
          property: {
            __typename: 'PropertyModel',
            address: {
              __typename: 'PropertyModelAddress',
              buildingName: '',
              buildingNumber: '90',
              countryId: '',
              geolocation: {
                __typename: 'PropertyModelAddressGeolocation',
                latitude: 52.144204,
                longitude: -0.501058,
              },
              line1: 'Bromham Road',
              line2: 'Biddenham',
              line3: 'Bedfordshire',
              line4: '',
              postcode: 'MK40 4AF',
            },
            id: 'BDF110502',
          },
          propertyConfirmed: false,
          propertyId: 'BDF110502',
          recurring: false,
          start: '2020-07-14T14:00:00Z',
          typeId: 'VW',
        },
      ],
      _links: {
        first: {
          href:
            // eslint-disable-next-line max-len
            '/appointments/?PageNumber=1&PageSize=25&end=2020-07-14T16:59:59.999Z&includeCancelled=true&negotiatorId=LJW&start=2020-07-07T17:00:00.000Z',
        },
        self: {
          href:
            // eslint-disable-next-line max-len
            '/appointments/?PageNumber=1&PageSize=25&end=2020-07-14T16:59:59.999Z&includeCancelled=true&negotiatorId=LJW&start=2020-07-07T17:00:00.000Z',
        },
      },
      pageCount: 8,
      pageNumber: 1,
      pageSize: 25,
      totalCount: 8,
    },
  },
}
