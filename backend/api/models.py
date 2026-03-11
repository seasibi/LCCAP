from django.db import models


class CalendarEvent(models.Model):
    STATUS_CHOICES = [
        ('Planned', 'Planned'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('Moved', 'Moved'),
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


class Project(models.Model):
    PILLAR_CHOICES = [
        ('1. Food Security', '1. Food Security'),
        ('2. Water Sufficiency', '2. Water Sufficiency'),
        ('3. Ecological and Environmental stability', '3. Ecological and Environmental stability'),
        ('4. Human Security', '4. Human Security'),
        ('5. Climate-Smart Industries and Services', '5. Climate-Smart Industries and Services'),
        ('6. Sustainable Energy', '6. Sustainable Energy'),
        ('7. Knowledge and Capacity Development', '7. Knowledge and Capacity Development'),
    ]
    
    STATUS_CHOICES = [
        ('Planning', 'Planning'),
        ('In Progress', 'In Progress'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('Delayed', 'Delayed'),
        ('Pending', 'Pending'),
    ]

    pillar = models.CharField(max_length=100, choices=PILLAR_CHOICES)
    office = models.CharField(max_length=200)
    project_name = models.CharField(max_length=500)
    accomplishment = models.IntegerField(default=0, help_text="Accomplishment percentage (0-100)")
    target = models.CharField(max_length=500, blank=True, null=True)
    actual = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='In Progress')
    quarter = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.project_name} - {self.office}"

    class Meta:
        ordering = ['-created_at']
