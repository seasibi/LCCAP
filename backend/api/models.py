from django.db import models


class SampleData(models.Model):
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']


class CalendarEvent(models.Model):
    STATUS_CHOICES = [
        ('Planned', 'Planned'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
    ]
    
    DURATION_CHOICES = [
        ('', 'Single Day'),
        ('2 days', '2 Days'),
        ('3 days', '3 Days'),
        ('4 days', '4 Days'),
        ('5 days', '5 Days'),
        ('1 week', '1 Week'),
        ('2 weeks', '2 Weeks'),
        ('1 month', '1 Month'),
    ]

    event_name = models.CharField(max_length=200)
    pillar = models.CharField(max_length=200, blank=True)
    office = models.CharField(max_length=200, blank=True)
    date = models.DateField()
    duration = models.CharField(max_length=50, choices=DURATION_CHOICES, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Planned')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.event_name} - {self.date}"

    class Meta:
        ordering = ['date']
