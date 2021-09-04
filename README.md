# csssr-task-manager
Studying csssr Event-Driven Applications course

## Task 1 - sequence diagram

[Authorized CRUD request](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIEEFdgAsD2AnEAvSATaBhAJQFUARaNSAR3kgGdgAoRgBwEM1QBjEdgO2DQAQmhQB3OpDSsO3XmwHC2XANYBaSHxwzOIHv0FDl6zXlJtgbAEZtJzEeMlo1APiOqNWgFwES5SjT0TMqgAG4WMO4mWoxRnjiucaZesFxc9HQAOgIoKprZ4eAgOBYgKHzMbOCCAbQM0KAAtpAoiLGiElKJHU5epCB0LOBsAJ4U1HXA2U0tiNDNdHRsAOaQjJDgktDK6YsNuZrQhcWMlABm0CihUsI9UgA0Sh6m0OaWNpJeAApSZ+iN40CDFw2y4oHKdEYVUEITKfDo0BYv3+ILo8DSGTO8HA4BGsWM8TU3UcUi8AGV0bsEZRBhC1hstrCIYjkWhmngxGAkNAzmwQOB4JR8c8tES3Hc0F5CPQWHToJzkNApKJpKZ1psYDsMvs8nwlQAPFggSg4AD0jSqfzZuGF0QSxM6kultPhMAV3IALAAGACMSrQKvaJOcbgJyWlQMEVug8BYJVAfGWOs0WT47vGZxp3OABz17BG4BQbG0SVFoZFOClkEz9CQ01zBSqxVK5Uq1QzWeTesghuNuHNVWrKJLYdFDt6ztlrvlXOg3r9yvQQcd49JABkUMtWkwGTBzp2c7qjk2RxXEqOzBZrLZID4AGIgLQd2td7KP6Dx692KHt-cvw+HH88AxKWCTlnaXjEHGERdpCoHnhWrxXh8t5fHMfCQGIsFvjkH7ITetqEquToynK6YYVhAHwqc1aXNcaC3MG9ygSkiCoBg2B4EQZCApM6pbH+dDZrm0B8CgUatCBF5ig4jpVi6WzpvO-qBjgkCwuEwCRBey5OMRXgblubRqusMSmdoQA) - base sequence for any CRUD request that requires access token. Access token is set into Authorization header with `Bearer` prefix.
<hr>

[Registration](https://sequencediagram.org/index.html#initialData=C4S2BsFMAICVIOYgM7AE4ENQHsB2AofABwzVAGMQTdhoAhNbAd2UjWNIqoxvo3IDWAWki4AJvjFYMAIwys+gkeOgARaXNaEGzVmiEA+Ov2GixALngBHAK6RU0AGbY00NIhTosIPNCZgACwAdXHBsJFxoHjFoEmRkJhcYkgBPMIwJflAANywYHRY2fCyQXOB8k2UJYyUzQxrTcXMANQxwEClykPJ3MVFQNuRCNtp3W3taUABbSGwbYHwCvXrGQrRzOEhxh2nZ+ZCZ+IwESHxIcAUeyD6aEEHoXPbqyrqjF5V1YFl5SHMAMRAKgw0Bsej8gRCREY2Q612gYQiw3AtFBbCi4HcGRS0EgAA9PEMGlUhCtdGxzABlMw4tCMVyHZDHGCyObAEJ4zyAhAgvRnC4wVGuMTYezQXDYWgc1CLd5ieqytQaH4bAAK8x5bBCgOA2GgnW+WiJdVJaw2VJUyBs5HI9mQbg8qEwOEiDKZZ3EhHOl16-TuF2ggMeHRltXEJKMqz0ZupQc6PkibDp0FdJ0kkBKZXykaKZkIfQzeUUjQkQA)
<br>

```typescript
interface IRequestPayload {
  login: string
  password: string
}
type SuccessResponseData = string // success registration message
```
<hr>

[Authorization](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIEEFdgAsD2AnEAvAhqFA7AKEIAds1QBjEM-YaAITRQHcBnSNU8qm7OxtkoBrALSR8AE0KTc2AEbYOgkeKnQAInMUdihJqw5pRAPgZCxEyQC4EydFlwgC0NJACO8SG3oA3ENjQ4CgA5iD40PyS0GRsbCzo0kKgvrgwBuychMkgqcDpFmrS5qpWpiWWUtYAatjgILL5ADr4lG6SEqB1bMR19G6e3vSgALaQKIj6zJnGZtNG1hogbCTg2ACerh5ePi2j44jQY3HYIZCEkODKbZAddAFX0OGp9cWFZeXznNYAylbQLwaThcnGYXEu13anQebABdQa+neUnKSOiWmACiUkGsAHFIPR4EYWvJNsEwkRsuACUZoAAzCZSRGlZFmVHWADCKBGZDcLVi8USPUp9H5CTQ0Uo6DclGATMqkhRzJs7LcaT2KGEEh6FSKivlmm0WOsAAVDm5aW42EhoMANRIWuFbdBGpjdDqPnNDN8fvBKJRvLDLSQCMoWGBrbbNfhYVFoDc7l0rtkZbk0owvlwMkZPl60NYAHLYfwhNO2lrYRCoDCYW6uCb5GSQHJ5dIZi5XGCixJPVpSyAyuW6nMzawAUTQYK2KxD5ysxAhMEJnGg+BQ9Hp8EZ7uRw4W48nQZnjebae30g6J-y6dzF0Zt+kQA)
<br>

```typescript
interface IRequestPayload {
  login: string
  password: string
}
// refresh token is returned in cookie with httpOnly flag
type SuccessResponseData = string // access token
```
<hr>

[Edit profile](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIFEBMzQK4GdICdoAcMHsAzEKAKBOwEMNQBjESgO2GgCF8B3dDcq2+ipqwo0A1gFpIDeD2og6jZi2HjJ8aABEKwCgCMK6MgQwUAtjABKkAI7JIqYJDXDQeBtAyQC0EA1Qh4MABEAILIwAAWeBggAF6O0ADC5gCq6u7WtvaBJAx4DtB4AG6YrBxcADRKohJSAFzQAAoUAJ7geBTwtQA6DGLQFODg0BEwuITEMESQ4PCoANw9fQyQ7Dj6qOxRaiCoBdguDAMLvd5ey6uUqBtbBVjoNB7MNnYHPVHQ94-9vuwlVDA0cICADmjh6IzcNGQGA8gku1ww212HhsIA88DmJGcIEKWhgVRUUhIBJq8DEAD4Sap6gA1Ab+PE9B6OSSgAaoMgDZgJdGskDs7wMXHgfzE5SkilUuoAFXCHB6woZr2WMKiJGm6ESvKY-PAu0V0ilZMp4tUGi0un0kHqyWw8DxKC40Ht2h6PmdFr0Bly+SKJSNtQAysgaDQ7Mi7NhXJqXRRuodBsNwqN8EQoNApjMOaoSEA)
<br>

```typescript
interface IRequestPayload {
  firstName: string
  lastName: string
  patronymic: string
  avatar: Blob | null
  secretQuestion: string | null
  secretAnswer: string | null
  password: string | null // required if secretQuestion, secretAnswer or newPassword are provided
  newPassword: string | null
}
type SuccessResponseData = {
  firstName?: string
  lastName?: string
  patronymic?: string
  avatar?: string
  secretQuestion?: string
}
```
<hr>

[Restore password](https://sequencediagram.org/index.html#initialData=C4S2BsFMAICVIM7APYCcYAcCGCEHc0ATAKGO1VAGMRsA7YaAIVWTwUlTKwpGrocZZKAawC0kWiXJUaWekyFiJhaABEswLACMckUs1btUogHyCR4yQC54ARwCuiBgDM00dEjQhaAc2jZcAlRCAB1aPDAAC2h2SnQGBycQZFpoORU5fA4wnH8sAE9wZCwSIVAANw0YcyVJYhrLQlMG5SsANSxwEEIqsMSkZNocyTTaLM5iToZ0foZQAFtIZHtgepY2Dmb1oytVEAQMcAL3SFmwhaWV6EXcLB89YkhwdmhZweg3TLwOaG9KrpILUkoi2hg4VgAoqgWKgTgcUuxHs8YG8UqMMmNvrD-t16opGs18co1BptLorABxSAJRwDFLDDHjPEWZSElnWNocEDOfJ9Wmgem0dKjJlIl6o1LCr4-cpc5wgSCAonA0EbVBWADK9kolEQCDhGARegMatVO3ghBA6Eoc2QYQ8KHQeUCRDC2HuazBxjMysINlO-OgrlhlEich83j8AXwrtolBSmm8kbS0FokDwHzTaX12EKxSV7KaPsL7U63V6tGjQRIk3A0wDTmgF2WqxNRjN4L2ByO+ROZ3oIEWLeuerueieLyrRF+tBxBdqTQ76qhMINRrFmBwMeC0DnzIXbIXJM0OnYVgAClc03g3Vvq-uCUvNdrdbg12NjdtNmYv+qu4djgQF89TCG4EDHT1TR-L1-Uta1bTCIoI1Sd1xzqDdXn5d5PkxH59lTZAGFlVBuQVedH2gtVIWhNwPEND9iEISAyhASpgGqX1HjqIA)
<br>

```typescript
interface IRequestPayload {
  secretQuestion: string
  secretAnswer: string
}
type SuccessResponseData = string
```
<hr>

[Create task](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIGECdIENg2EgzgawFA4A5LygDGIhAdsNAELwD2A7hpPAUaeUlbUiVgFpIFACbtiIMpWo0+g4SOgARFEgBGmSHgBm8JAFsYAJUgBHAK6QMqRX1D0K0RNuggKGECJgAiAILngAAt6eBAAL0hFWCMAVSUnM0trbxwKelRoegA3VloGZlYAGll+IVEALmgABSQAT3B6JBFygB0KAWgkcHBoILRMLGhtEEhwEQwAbjaO9GxesChoDsQLEEQRKfbMvvghkbGMJcz8ewou6AAKEm5oNRgKc26ASgmcOxAslBgS+VEcH7KIgEAD4AQpKgA1LqeL5tWaDYajcZ4LrUAAqAz2SMObk+4E8-zkgJBYIqaMC+TaeJhpzarAYbFGLGgGLmiIO0GpYlJQNBRIUylUGhYlSqAV6AzabmA9GgIiFmlS6Rg2VyPPKAGVzCQSFZDogMPgHMz5ehWmduhK2ftkQocEA)
<br>

```typescript
interface IRequestPayload {
  title: string
  type?: string
  plannedStartTime?: [number, number]
  plannedEndTime?: [number, number]
  startTime?: [number, number]
  endTime?: [number, number]
}
type SuccessResponseData = {
  id: string
  title: string
  type?: string
  plannedStartTime?: [number, number]
  plannedEndTime?: [number, number]
  startTime?: [number, number]
  endTime?: [number, number]
}
```
<hr>

[Edit task](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIFEBMzWAQwM4GsBQWAOKAnUAYxHwDthoAhAgewHc1IC9CSyVKaViMBaSOXhsiIUhSrVeAofGgARFKgBG6SDgBmBFAFsYAJUgBHAK6Q0wSPN6g65aAUiboIcmhDwYAIgCCp4AALOgIQAC9raABhAwBVBUcTc0tvLHI6K2g6ADcWGnomFgAaaT5BYQAuaAAFFABPcDoUeAqAHXIUcHBkQJhUTGhNEEhweDQsWxBs5RhS2WEsOfL4fgA+JbkqgDVOzxn2-oxB4dHxifAqABV0I6GRsddyafBPRZlltY3Ky8CC9ue9nZyO0WPRWCNmNBrgM7qdoACRF8Vut3nJFMoUGpmFVYrh4DNkDd2m5gHRoPjVOo0hkYDk8kiKgBlUzEYgWNCJNC4eyQikoNodLqEmEnMZYORYIA)
<br>

```typescript
interface IRequestPayload {
  id: string
  title: string
  type: string | null
  plannedStartTime: [number, number] | null
  plannedEndTime: [number, number] | null
  startTime: [number, number] | null
  endTime: [number, number] | null
}
type SuccessResponseData = {
  id: string
  title: string
  type: string | null
  plannedStartTime: [number, number] | null
  plannedEndTime: [number, number] | null
  startTime: [number, number] | null
  endTime: [number, number] | null
}
```
<hr>

[Get task list](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIHFONYBDAzga2uErgCg8AHZAJ1AGMRiA7RAIRIHsB3VSEo0iq5W6O5OXQBaSNQAmnMiEo16gkWPHQAIshQAjNJAIAzEsgC2MAEqQAjgFdIuSMsGhG1aCUi7oIaqhDiYAIgBBS2AAC0YSEAAvO2gAYRMAVRUXC2tcPzxqRmAYRgA3dn4mVnYAGgEhUQkALmgABWQAT3BGZHFqgB1qXRBwHJJUPAcQPPUYCsUJPAmq8WEAPhmlWoA1ZGxxMa6evvZBob7oADFe-tQPalGN6YVZhaWagBUQ4q6rn3UQJy72Jg5IcBsY6nPbQd6SB5zRa3JSqdTILRsWrwRAoDCobZMQzQTaabRdDSNaA7M6ZbK5AokfgwmoAZUs5HINnOrlQhCcQNxyE63RBrmUaMw2FweCUeCAA) - 
Request payload
```typescript
interface IRequestPayload {
  user: string
  title? : string
  type?: string
  plannedStartTime?: [number, number]
  plannedEndTime?: [number, number]
  startTime?: [number, number]
  endTime?: [number, number]
}
type SuccessResponseData = {
  id: string
  title: string | null
  type: string | null
  plannedStartTime: [number, number] | null
  plannedEndTime: [number, number] | null
  startTime: [number, number] | null
  endTime: [number, number] | null
}[]
```
<hr>

### Every response payload
```typescript
interface IResponsePayload<T> {
  error: { code: number; message: string } | null
  data: T | null
}
```

## Task 2 - create front-end components with mocked back-end responses
Made by Create-React-App
<br>
`npm run start` - start application in dev mode